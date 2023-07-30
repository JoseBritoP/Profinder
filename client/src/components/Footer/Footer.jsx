import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  useColorModeValue,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const footerStyles = {
  minH: "100vh",
  left: 0,
  bottom: 0,
  width: "100%",
  dark: {
    900: "#151515",
    700: "#202020",
  },
  text: {
    800: "#908E9B",
  },
};

function Footer() {
  const bgColor = useColorModeValue("gray.200", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.600");

  return (
    <Box bg={bgColor} color={textColor} style={footerStyles}>
      <Container maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 2 }} spacing={8}>
          <Stack align="center" justify="flex-end">
            <Heading as="h2" fontWeight="bold" fontSize="xl" color="blue.400">
              Información
            </Heading>
            <Link to="./aboutus">
              <Text color="gray.400">Sobre nosotros</Text>
            </Link>
            <Link to="./feedback">
              <Text color="gray.400">Contáctanos</Text>
            </Link>
            <Link to="./comofunciona">
              <Text color="gray.400">Cómo funciona</Text>
            </Link>
            <Link to="./">
              <Text color="gray.400">Home</Text>
            </Link>
          </Stack>

          <Stack align="center" justify="flex-end">
            <Heading as="h2" fontWeight="bold" fontSize="xl" color="blue.500">
              Ingresos
            </Heading>
            <Link to="./registerCliente">
              <Text color="gray.400">Registro Usuario</Text>
            </Link>
            <Link to="./registerProvider">
              <Text color="gray.400">Registro Profesional</Text>
            </Link>
            <Link to="./userLogin">
              <Text color="gray.400">Inicia Sesion</Text>
            </Link>
            <Link to="./categories">
              <Text color="gray.400">Categorias</Text>
            </Link>
          </Stack>
        </SimpleGrid>
        <Stack align="center" mt={8}>
          <Text fontSize="sm" textAlign="center" color="gray.600">
            © 2023 Profinder create. All rights reserved
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
