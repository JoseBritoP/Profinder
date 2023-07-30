import { Grid } from "@chakra-ui/react";
import { Box, useColorModeValue, Button, Stack } from "@chakra-ui/react";
import { ChatIcon, ViewIcon, EditIcon, QuestionIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = {
    display: "block",
    padding: "10px",
    textDecoration: "none",
    color: useColorModeValue("gray.700", "gray.200"),
    _hover: {
      bg: useColorModeValue("gray.200", "gray.700"),
    },
  };

  const [showInicio, setShowInicio] = useState(false);
  const [showAyuda, setShowAyuda] = useState(false);

  const handleShowInicio = () => {
    setShowInicio(true);
    setShowAyuda(false);
  };
  const handleShowAyuda = () => {
    setShowAyuda(true);
  };
  useEffect(() => {
    handleShowInicio();
  }, []);

  return (
    <Box height="100vh">
      <Grid templateColumns="250px 1fr" gap="2" height="100%">
        {/* Menú de opciones */}
        <Box bg="gray.600" p={2}>
          <Stack spacing={4}>
            <RouterLink
              to="/dashboardSuppliers"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button variant="outline" onClick={handleShowInicio}>
                Incio
              </Button>
            </RouterLink>
            <RouterLink
              to="/dashboardSuppliers/publicaciones"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button variant="outline" leftIcon={<ChatIcon />}>
                Publicar
              </Button>
            </RouterLink>
            <RouterLink
              to="/dashboardSuppliers/nuevas-publicaciones"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button variant="outline" leftIcon={<ViewIcon />}>
                Ver mis Publicaciones
              </Button>
            </RouterLink>
            <RouterLink
              to="/dashboardSuppliers/updateprofile"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button variant="outline" leftIcon={<EditIcon />}>
                Editar mi Perfil
              </Button>
            </RouterLink>
            <RouterLink to="#" spy smooth duration={500} style={linkStyle}>
              <Button variant="outline">Obtén Premium</Button>
            </RouterLink>
            <RouterLink
              to="/dashboardSuppliers/help"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button
                variant="outline"
                leftIcon={<QuestionIcon />}
                onClick={handleShowAyuda}
              >
                Ayuda
              </Button>
            </RouterLink>
            <RouterLink
              to="/dashboardSuppliers/updatepost"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button variant="outline" leftIcon={<EditIcon />}>
                Actualizar Post
              </Button>
            </RouterLink>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Sidebar;
