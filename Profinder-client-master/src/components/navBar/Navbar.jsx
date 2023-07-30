import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Image,
  useColorModeValue,
  HStack,
  Button,
  useColorMode
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../../utils/Darkmode/DarkmodeToggle";
import Logo from "../../assets/categoriesIcons/Logo.png";
import logodark from "../../assets/categoriesIcons/logodark.png";
//import SearchBar from '../SearchBar/SearchBar'
import NavLink from "../../singleComponents/NavLink";

const Navbar = () => {
  const navigate = useNavigate();
  // const location = useLocation()
  const navbarBgColor = useColorModeValue("gray.200", "gray.900");
  const { colorMode } = useColorMode();
  // variable para controlar la renderizacion de la searchbar"
  // const isCategoriesRoute = location.pathname === '/categories'

  return (
    <nav
      style={{
         position: "sticky",
        //position: "fixed",
        width: '100%',
        top: 0,
        zIndex: 100,
      }}
    >
      <Flex
        position="sticky"
        top="0px"
        justifyContent="space-between"
        alignItems="center"
        padding={4}
        bg={navbarBgColor}
        as="div"
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="2xl"
        fontFamily="body"
        color="gray.700"
      >
        <HStack spacing={8} alignItems="center">
          <Box onClick={() => navigate("/")} _hover={{ cursor: "pointer" }}>
            <Image
               src={colorMode === "light" ? Logo : logodark}
               width={{ base: "50%", md: "100%", lg: "100%" }}
               height="70px"
            />
          </Box>
          <HStack
            as="nav"
            spacing={10}
            display={{ base: "none", md: "flex" }}
            fontSize="1.2rem"
            fontWeight="bold"
            color={useColorModeValue("gray.900", "gray.100")}
          >
            <NavLink textLink="¿Como funciona?" routeLink="/comofunciona" />
            <NavLink textLink="Profesionales" routeLink="/categories" />
            <NavLink textLink="Contacto" routeLink="/feedback" />
            <NavLink textLink="Acerca de" routeLink="/aboutus" />
          </HStack>
        </HStack>

        <Box display={{ base: "block", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              size="lg"
              icon={<HamburgerIcon />}
              variant="ghost"
              textDecoration="none"
            />
            <MenuList >
              <MenuItem color={useColorModeValue("gray.900", "gray.100")} onClick={() => navigate("/comofunciona")} >
                ¿Como funciona?
              </MenuItem>
              <MenuItem color={useColorModeValue("gray.900", "gray.100")} onClick={() => navigate("/categories")}>
                Profesionales
              </MenuItem>
              <MenuItem
                color={useColorModeValue("gray.900", "gray.100")}
                onClick={() => navigate("/feedback")}
              >
                Contacto
              </MenuItem>
              <MenuItem
                color={useColorModeValue("gray.900", "gray.100")}
                onClick={() => navigate("/aboutus")}
              >
                Acerca de
              </MenuItem>
              <MenuItem
                color={useColorModeValue("gray.900", "gray.100")}
                onClick={() => navigate("/userLogin")}
              >
                Iniciar sesion
              </MenuItem>
              <MenuItem
                color={useColorModeValue("gray.900", "gray.100")}
                onClick={() => navigate("/registerCliente")}
              >
                Registrarse cliente
              </MenuItem>
              <MenuItem
                color={useColorModeValue("gray.900", "gray.100")}
                onClick={() => navigate("/registerProvider")}
              >
                Registrarse profesional
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <DarkModeToggle />
        {/* pregunto si es true, si es asi se muestra la search, de lo contrario se oculta */}
        {/* {isCategoriesRoute && <SearchBar />} */}

        <HStack
          display={{ base: "none", md: "block", lg: "row" }}
          justifyContent="space-between"
        >
          <Button
            variant="solid"
            colorScheme="gray"
            size="md"
            mr={6}
            onClick={() => navigate("/userLogin")}
          >
            Iniciar sesion
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              // bg={useColorModeValue("blue.500", "blue.700")}
              // color="gray.100"
              // _hover={{
              //   bg: "blue.600",
              // }}
            >
              Registrarse
            </MenuButton>
            <MenuList>
              <MenuItem
                color={useColorModeValue("gray.900", "gray.100")}
                onClick={() => navigate("/registerProvider")} fontSize="1.2rem"
                fontWeight="bold"
              >
                Soy profesional
              </MenuItem>
              <MenuItem
                color={useColorModeValue("gray.900", "gray.100")}
                onClick={() => navigate("/registerCliente")} fontSize="1.2rem"
                fontWeight="bold"
              >
                Soy cliente
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <Button
            variant='solid'
            colorScheme='blue'
            size='md'
            onClick={() => navigate('/userRegister')}
          >
            Registrarse
          </Button> */}
        </HStack>
      </Flex>
    </nav>
  );
};

export default Navbar;
