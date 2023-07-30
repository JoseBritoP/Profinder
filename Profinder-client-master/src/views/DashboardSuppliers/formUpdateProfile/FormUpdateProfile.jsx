import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Avatar,
  Spacer,
  Select,
  Box,
  Center,
  Alert,
  AlertIcon,
  CloseButton,
  useColorMode,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  getAllClients,
  updateProfesionals,
} from "../../../services/redux/actions/actions";
import { uploadFiles3 } from "../../../utils/Firebase/config";

function FormUpdateProfile() {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "gray.800" : "gray.100";
  const textColor = colorMode === "dark" ? "gray.100" : "blue.900";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [genre, setGenre] = useState("");
  const [countryId, setCountryId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [countries, setCountries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const placeholderTextColorLight = "gray.200";
  const placeholderTextColor =
    colorMode === "light" ? placeholderTextColorLight : undefined;

  const userSession = JSON.parse(localStorage.getItem("userSession"));

  console.log(userSession);

  useEffect(() => {
    if (userSession) {  
      setName(userSession.name);
      setEmail(userSession.email);
      setPhone(userSession.phone);
      setGenre(userSession.genre);
      setCountryId(userSession.CountryId);
      setLocationId(userSession.LocationId);
      setDescription(userSession.description);
      setImageUrl(userSession.image);
    }

    fetch("https://backprofinder-production.up.railway.app/country")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setCountryId(countryId);

    if (countryId) {
      fetch(
        `https://backprofinder-production.up.railway.app/country/${countryId}`
      )
        .then((response) => response.json())
        .then((data) => {
          const selectedCountry = data;
          if (selectedCountry) {
            fetch("https://backprofinder-production.up.railway.app/location")
              .then((response) => response.json())
              .then((locationsData) => {
                const filteredLocations = locationsData.filter(
                  (location) => location.CountryId === selectedCountry.id
                );
                setLocations(filteredLocations);
              })
              .catch((error) => console.log(error));
          } else {
            setLocations([]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setLocations([]);
    }
  };

  const handleLocationChange = (e) => {
    setLocationId(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const imageUrls = await uploadFiles3([imageUrl]);

      const newData = {
        name: name,
        email: email,
        password: "",
        image: imageUrls,
        phone: phone,
        description: description,
        genre: genre,
        CountryId: countryId,
        LocationId: locationId,
      };

      dispatch(updateProfesionals( newData,userSession.profesionaId));

      // Actualiza la sesión en localStorage con los nuevos datos
      const updatedSession = {
        ...userSession,
        name: newData.name,
        email: newData.email,
        phone: newData.phone,
        genre: newData.genre,
        CountryId: newData.CountryId,
        LocationId: newData.LocationId,
        description: newData.description,
        image: newData.image,
      };
      localStorage.setItem("userSession", JSON.stringify(updatedSession));

      setIsLoading(false);
      setShowSuccessAlert(true);
      console.log(updatedSession);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating client information:", error);
      alert(
        "An error occurred while updating client information. Please try again later."
      );
    }
  };

  const profesionales = useSelector((state) => state.profesionales);
  const profesional = profesionales.find((p) => p.id === userSession.id);

  useEffect(() => {
    const response = dispatch(getAllClients());
    //console.log(response);
  }, []);

  useEffect(() => {
    if (profesional) {
      setName(profesional.name);
      setEmail(profesional.email);
      setPhone(profesional.phone);
      setGenre(profesional.genre);
      setCountryId(profesional.CountryId);
      setLocationId(profesional.LocationId);
      setDescription(profesional.description);
      setImageUrl(profesional.image);
    }
  }, [profesional]);

  return (
    <Center p={4} h="100vh" w="100%" bg={bgColor}>
      <Box mx="auto" maxW="5xl" w="100%">
        <Heading color={useColorModeValue("gray.900", "white")} align="center">
          EDITA TU PERFIL
        </Heading>
        <br />
        <Center>
          <VStack
            as="form"
            alignItems="center"
            textAlign="center"
            onSubmit={handleSubmit}
            bg={bgColor}
            color={textColor}
            spacing={4}
            px={8}
            py={6}
            w={{ base: "100%", sm: "90%", md: "80%", lg: "70%" }}
            borderRadius="lg"
            boxShadow="lg"
          >
            <FormControl>
              <Box>
                <FormLabel>Foto de perfil</FormLabel>
                <Avatar
                  size="xl"
                  name="Nombre y apellido"
                  src={imageUrl || undefined}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUrlChange}
                />
              </Box>
            </FormControl>
            {showSuccessAlert && (
              <Alert status="success" mt={4} w="100%">
                <AlertIcon />
                Perfil Actualizado
                <CloseButton
                  ml="auto"
                  onClick={() => setShowSuccessAlert(false)}
                />
              </Alert>
            )}
            <FormControl>
              <Box>
                <FormLabel>Nombre y apellido</FormLabel>
                <Input
                  variant="unstyled"
                  placeholder="Nombre y apellido"
                  value={name}
                  onChange={handleNameChange}
                  bg={bgColor}
                  color={textColor}
                  placeholderTextColor={placeholderTextColor}
                />
              </Box>
            </FormControl>
            <FormControl>
              <Box>
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  variant="unstyled"
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={handleEmailChange}
                  bg={bgColor}
                  color={textColor}
                  placeholderTextColor={placeholderTextColor}
                />
              </Box>
            </FormControl>
            <FormControl>
              <Box>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  variant="unstyled"
                  type="tel"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={handlePhoneChange}
                  bg={bgColor}
                  color={textColor}
                  placeholderTextColor={placeholderTextColor}
                />
              </Box>
            </FormControl>
            <FormControl>
              <Box>
                <FormLabel>Género</FormLabel>
                <Select
                  value={genre}
                  onChange={handleGenreChange}
                  bg={bgColor}
                  color={textColor}
                >
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                </Select>
              </Box>
            </FormControl>
            <FormControl>
              <Box>
                <FormLabel>País</FormLabel>
                <Select
                  placeholder="País"
                  value={countryId}
                  onChange={handleCountryChange}
                  bg={bgColor}
                  color={textColor}
                >
                  <option value="">Seleccionar país</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </Select>
              </Box>
            </FormControl>
            <FormControl>
              <Box>
                <FormLabel>Provincia/Estado</FormLabel>
                <Select
                  placeholder="Provincia/Estado"
                  value={locationId}
                  onChange={handleLocationChange}
                  bg={bgColor}
                  color={textColor}
                >
                  <option value="">Seleccionar provincia/estado</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </Select>
              </Box>
            </FormControl>
            <Spacer />
            <Button type="submit" colorScheme="blue" size="lg" w="100%">
              Actualizar
            </Button>{" "}
          </VStack>
        </Center>
      </Box>
    </Center>
  );
}

export default FormUpdateProfile;
