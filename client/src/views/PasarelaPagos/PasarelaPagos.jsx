import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { getProfesionals } from "../../services/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSessionState } from "../../services/zustand/useSession";

function PasarelaPagos() {
  const [preferenceId, setPreferenceId] = useState(null);
  const dataSuppliers = useSelector((state) => state.profesionales);
  // const userSession = JSON.parse(localStorage.getItem("userSession"));
  const session = useSessionState((state) => state.session);
  const [isLoading, setIsLoading] = useState(false);

  const profile = dataSuppliers.find((user) => user.id === session.id);
  // console.log(session.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfesionals());
  }, []);

  initMercadoPago("TEST-6d144f52-f1d4-4a24-853e-d1b4592053fb"); //ocultar cuando este deploy

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "https://backprofinder-production.up.railway.app/cash",
        {
          description: "Bienvenido",
          price: 9,
          quantity: 1,
          ProfesionalId: session.id,
        }
      );
      console.log(response);
      const { preferenceId } = response.data;
      console.log(preferenceId);
      return preferenceId;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBuy = async () => {
    setIsLoading(true);
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
    setIsLoading(false);
  };

  return (
    <Flex
      py={6}
      justify="center"
      align="center"
      direction={{ base: "column", md: "row" }}
      wrap="wrap"
      spacing="4"
    >
      {/* Basic Plan */}
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        maxW={{ base: "full", md: "500px" }}
        w={{ base: "full", md: "auto" }}
        py={6}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={useColorModeValue("red.50", "red.900")}
            p={2}
            px={3}
            color={"red.500"}
            rounded={"full"}
          >
            BASICO
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"}>$</Text>
            <Text fontSize={"6xl"} fontWeight={800}>
              0
            </Text>
            <Text color={"gray.500"}>/mes</Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List spacing={3} align={"center"}>
            <ListItem>
              <ListIcon as={CloseIcon} color="red.400" />
              Mejor posicionamiento
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              Primer publicacion gratis
            </ListItem>
          </List>

          <Button
            mt={10}
            w={"full"}
            colorScheme="gray"
            bg={"gray.600"}
            color={"white"}
            rounded={"xl"}
            _hover={{}}
          >
            Basic
          </Button>
        </Box>
      </Box>

      {/* Premium Plan */}
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        maxW={{ base: "full", md: "500px" }}
        w={{ base: "full", md: "auto" }}
        py={6}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={useColorModeValue("green.50", "green.900")}
            p={2}
            px={3}
            color={"green.500"}
            rounded={"full"}
          >
            PREMIUM
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"}>$</Text>
            <Text fontSize={"6xl"} fontWeight={800}>
              999
            </Text>
            <Text color={"gray.500"}>/mes</Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List spacing={3} align={"center"}>
            <ListItem fontSize="lg">
              <ListIcon as={CheckIcon} color="green.400" />
              Mejor posicionamiento
            </ListItem>
            <ListItem fontSize="lg">
              <ListIcon as={CheckIcon} color="green.400" />
              Publicaciones ilimitadas
            </ListItem>
            <ListItem fontSize="lg">
              <ListIcon as={CheckIcon} color="green.400" />
              Todas las caracteristicas
            </ListItem>
          </List>
          <Stack>
            <Button
              loadingText="Submitting"
              bg="teal.400"
              color="white"
              _hover={{ bg: "teal.500" }}
              type="submit"
              size="lg"
              marginTop="5"
              onClick={handleBuy}
            >
              {isLoading && !preferenceId ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="lg"
                />
              ) : null}
              Obtene premium
            </Button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}

export default PasarelaPagos;
