import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  Stack,
  Button,
  Heading,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChatIcon,
  ViewIcon,
  EditIcon,
  QuestionIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { Link as ScrollLink } from "react-scroll";
import DataSuppliers from "../DataSuppliers/DataSuppliers";
import CustomChatBot from "../../../components/CustomChatBot/CustomChatBot";
import FormServicio from "../../FormServicio/FormServicio";
import PostsSuppliers from "../PostSuppliers/PostsSuppliers";
import PasarelaPagos from "../../PasarelaPagos/PasarelaPagos";
import Data from "../Data/Data";
import FormUpdateProfile from "../formUpdateProfile/FormUpdateProfile";
import UpdatePost from "../UpdatePost/UpdatePost";
import { useSessionState } from "../../../services/zustand/useSession";
import { useSelector } from "react-redux";
import BtnPremium from "../BtnPremium/BtnPremium";

const linkStyle = {
  display: "block",
  padding: "10px",
  textDecoration: "none",
  color: "white",
};

const DashboardSuppliers = () => {
  const user = useSessionState((state) => state.session);
  const profesionales = useSelector((state) => state.profesionales);
  const filteredActive = profesionales.filter((post) => post.id === user.id);

  // aca veo si hay usuario logueado
  const userExists = filteredActive.length > 0;
  // aca me quedo con la propiedad active
  const isActive = userExists && filteredActive[0].active;

  const [currentPage, setCurrentPage] = useState("Inicio");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDataView, setIsDataView] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //alternar la vista de la data
  const handleToggleDataView = () => {
    setIsDataView(!isDataView);
  };

  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });
  const isMobile = useMediaQuery("(max-width: 767px)")[0];

  return (
    <Box
      height="100vh"
      display="flex"
      bg={useColorModeValue("gray.800", "gray.500")}
    >
      {/* Barra lateral */}
      {!isMobile && (
        <Box
          w="250px"
          p={2}
          bg={useColorModeValue("blackAlpha.800", "gray.800")}
        >
          <Stack spacing={4}>
            <ScrollLink
              to="/dashboardSuppliers/publicaciones"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button
                variant="outline"
                onClick={() => handlePageChange("Inicio")}
                bg={currentPage === "Inicio" ? "blue.500" : ""}
                color={currentPage === "Inicio" ? "White" : ""}
              >
                Inicio
              </Button>
            </ScrollLink>

            <ScrollLink
              to="/dashboardSuppliers/publicaciones"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button
                variant="outline"
                onClick={() => handlePageChange("FormServicio")}
                bg={currentPage === "FormServicio" ? "blue.500" : ""}
                color={currentPage === "FormServicio" ? "white" : ""}
                leftIcon={<ChatIcon />}
              >
                Publicar
              </Button>
            </ScrollLink>

            <ScrollLink
              to="/dashboardSuppliers/nuevas-publicaciones"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button
                variant="outline"
                onClick={() => handlePageChange("PostsSuppliers")}
                bg={currentPage === "PostsSuppliers" ? "blue.500" : ""}
                color={currentPage === "PostsSuppliers" ? "white" : ""}
                leftIcon={<ViewIcon />}
              >
                Ver mis Publicaciones
              </Button>
            </ScrollLink>

            <ScrollLink
              to="/dashboardSuppliers/updateprofile"
              style={linkStyle}
              onClick={() => handlePageChange("FormUpdateProfile")}
            >
              <Button
                variant="outline"
                bg={currentPage === "FormUpdate" ? "blue.500" : ""}
                color={currentPage === "FormUpdate" ? "white" : ""}
                leftIcon={<EditIcon />}
              >
                Editar mi Perfil
              </Button>
            </ScrollLink>

            <ScrollLink
              to="pasarela"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button
                variant="outline"
                onClick={() => handlePageChange("PasarelaPagos")}
                bg={currentPage === "PasarelaPagos" ? "blue.500" : ""}
                color={currentPage === "PasarelaPagos" ? "white" : ""}
                leftIcon={<StarIcon />}
                isDisabled={isActive}
              >
                Obtén Premium
              </Button>
            </ScrollLink>
            <ScrollLink
              to="/dashboardSuppliers/help"
              spy
              smooth
              duration={500}
              style={linkStyle}
            >
              <Button
                variant="outline"
                onClick={() => handlePageChange("help")}
                bg={currentPage === "help" ? "blue.500" : ""}
                color={currentPage === "help" ? "white" : ""}
                leftIcon={<QuestionIcon />}
              >
                Ayuda
              </Button>
            </ScrollLink>
          </Stack>
        </Box>
      )}

      {/* Contenido principal */}
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="left"
      >
        {/* Botón Hamburguesa (visible en pantallas pequeñas) */}
        {isMobile && (
          <IconButton
            aria-label="Abrir menú"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            size="md"
            m={2}
          />
        )}

        <Drawer isOpen={isOpen && isMobile} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="gray.600">
            <DrawerCloseButton />
            <DrawerHeader>
              <Stack spacing={4}>
                <ScrollLink
                  to="/dashboardSuppliers/publicaciones"
                  spy
                  smooth
                  duration={500}
                  style={linkStyle}
                >
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange("Inicio")}
                    bg={currentPage === "Inicio" ? "blue.500" : ""}
                    color={currentPage === "Inicio" ? "white" : ""}
                  >
                    Inicio
                  </Button>
                </ScrollLink>

                <ScrollLink
                  to="/dashboardSuppliers/publicaciones"
                  spy
                  smooth
                  duration={500}
                  style={linkStyle}
                >
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange("FormServicio")}
                    bg={currentPage === "FormServicio" ? "blue.500" : ""}
                    color={currentPage === "FormServicio" ? "white" : ""}
                    leftIcon={<ChatIcon />}
                  >
                    Publicar
                  </Button>
                </ScrollLink>

                <ScrollLink
                  to="/dashboardSuppliers/nuevas-publicaciones"
                  spy
                  smooth
                  duration={500}
                  style={linkStyle}
                >
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange("PostsSuppliers")}
                    bg={currentPage === "PostsSuppliers" ? "blue.500" : ""}
                    color={currentPage === "PostsSuppliers" ? "white" : ""}
                    leftIcon={<ViewIcon />}
                  >
                    Ver mis Publicaciones
                  </Button>
                </ScrollLink>

                <ScrollLink
                  to="/dashboardSuppliers/updateprofile"
                  style={linkStyle}
                  onClick={() => handlePageChange("FormUpdateProfile")}
                >
                  <Button
                    variant="outline"
                    bg={currentPage === "FormUpdate" ? "blue.500" : ""}
                    color={currentPage === "FormUpdate" ? "white" : ""}
                    leftIcon={<EditIcon />}
                  >
                    Editar mi Perfil
                  </Button>
                </ScrollLink>
                <ScrollLink
                  to="/dashboardSuppliers/updatepost"
                  spy
                  smooth
                  duration={500}
                  style={linkStyle}
                >
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange("updatepost")}
                    bg={currentPage === "updatepost" ? "blue.500" : ""}
                    color={currentPage === "updatepost" ? "white" : ""}
                    leftIcon={<ViewIcon />}
                  >
                    Editar Post
                  </Button>
                </ScrollLink>

                <ScrollLink
                  to="/dashboardSuppliers/pasarela"
                  spy
                  smooth
                  duration={500}
                  style={linkStyle}
                >
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange("PasarelaPagos")}
                    bg={currentPage === "PasarelaPagos" ? "blue.500" : ""}
                    color={currentPage === "PasarelaPagos" ? "white" : ""}
                    leftIcon={<StarIcon />}
                    isDisabled={isActive}
                  >
                    Obtén Premium
                  </Button>
                </ScrollLink>
                <ScrollLink
                  to="/dashboardSuppliers/help"
                  spy
                  smooth
                  duration={500}
                  style={linkStyle}
                >
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange("help")}
                    bg={currentPage === "help" ? "blue.500" : ""}
                    color={currentPage === "help" ? "white" : ""}
                    leftIcon={<QuestionIcon />}
                  >
                    Ayuda
                  </Button>
                </ScrollLink>
              </Stack>
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing={4}></Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Contenido de la página */}
        {currentPage === "Inicio" && (
          <Flex direction="column" alignItems="center">
            <Heading
              as="h1"
              size={isTabletOrMobile ? "lg" : "sm"}
              my={4}
              color="white"
              fontFamily="body"
            >
              MIS DATOS ONLINE
            </Heading>
            <Flex
              direction={isMobile ? "column" : "column"}
              justifyContent="space-around"
            >
              {/* Botón de toggle */}
              {isMobile && (
                <Button onClick={handleToggleDataView} mb={4}>
                  {isDataView ? "Ver En Grafica" : "Ver En Data"}
                </Button>
              )}

              {/*aca alterno la vista del toggle*/}
              {isDataView ? <Data /> : <DataSuppliers />}
            </Flex>
            {!isMobile && <DataSuppliers />}
            <Box borderRadius="10px" p={3} mb={3} color="white">
              <BtnPremium />
            </Box>
          </Flex>
        )}
        {currentPage === "FormServicio" && (
          <Flex justifyContent="center" alignItems="center" flex="1">
            <FormServicio />
          </Flex>
        )}
        {currentPage === "PostsSuppliers" && (
          <Box>
            <PostsSuppliers />
          </Box>
        )}

        {currentPage === "FormUpdateProfile" && (
          <Flex justifyContent="center" alignItems="center" flex="1">
            <FormUpdateProfile />
          </Flex>
        )}
        {currentPage === "help" && (
          <Flex justifyContent="center" alignItems="center" marginTop="10">
            <CustomChatBot />
          </Flex>
        )}
        {currentPage === "PasarelaPagos" && (
          <Box>
            <PasarelaPagos />
          </Box>
        )}
        {currentPage === "updatepost" && (
          <Box>
            <UpdatePost />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DashboardSuppliers;
