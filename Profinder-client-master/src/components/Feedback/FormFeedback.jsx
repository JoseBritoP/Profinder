import { useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import {
  validateName,
  validateEmail,
  validateMessage,
} from "./validations";

const FeedbackForm = () => {
  const form = useRef();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    emailError: "",
    messageError: "",
  });

  const offensiveWords = ["malparido"];

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const cardBgColor = colorMode === "light" ? "white" : "gray.700";
  const textColor = colorMode === "light" ? "black" : "white";

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));

    if (name === "name") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        nameError: validateName(value),
      }));
    } else if (name === "email") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        emailError: validateEmail(value),
      }));
    } else if (name === "message") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        messageError: validateMessage(value, offensiveWords),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formErrors.nameError ||
      formErrors.emailError ||
      formErrors.messageError
    ) {
      return;
    }

    emailjs
      .sendForm(
        "service_222k70i",
        "template_g2gknab",
        form.current,
        "oLGJ6pmOmylDWs04N"
      )
      .then(
        () => {
          alert("Mensaje enviado con éxito");
        },
        () => {
          alert("Error al enviar el Mensaje");
        }
      );

    // Restablecer los campos del formulario después de enviarlo
    setFormValues({
      name: "",
      email: "",
      message: "",
    });
  };

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <Flex
      height="70vh"
      alignItems="center"
      justifyContent="center"
      bg={bgColor} // Usa gray.800 para el modo oscuro y gray.100 para el modo claro
      color={textColor} // Cambia el color del texto para el modo oscuro
    >
      <Box
        maxWidth="500px"
        width="100%"
        padding="20px"
        boxShadow="md"
        borderRadius="md"
        bg={cardBgColor} // Usa gray.700 para el modo oscuro y white para el modo claro
      >
        <form ref={form} onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              isInvalid={!!formErrors.nameError}
            />
          </FormControl>
          {formErrors.nameError && (
            <Box color="red">{formErrors.nameError}</Box>
          )}

          <FormControl mt={4}>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              isInvalid={!!formErrors.emailError}
            />
          </FormControl>
          {formErrors.emailError && (
            <Box color="red">{formErrors.emailError}</Box>
          )}

          <FormControl mt={4}>
            <FormLabel>Mensaje</FormLabel>
            <Textarea
              name="message"
              value={formValues.message}
              onChange={handleInputChange}
              isInvalid={!!formErrors.messageError}
            />
          </FormControl>
          {formErrors.messageError && (
            <Box color="red">{formErrors.messageError}</Box>
          )}

          <Button
            type="submit"
            mt={4}
            colorScheme="blue"
            isFullWidth
            size="lg"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </form>

        
      </Box>
    </Flex>
  );
};

export default FeedbackForm;