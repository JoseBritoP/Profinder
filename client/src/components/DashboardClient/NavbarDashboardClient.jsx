import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuDivider,
    MenuItem,
    useColorModeValue,
    Stack,
   // useColorMode,
    Image,
    HStack,
    VStack,
  } from "@chakra-ui/react";
  import { MoonIcon, SunIcon } from "@chakra-ui/icons";
  import SidebarClient from "./SidebarClient/SidebarClient";
  import { Link } from "react-router-dom";
  import logo from "../../assets/categoriesIcons/logo.png";
  
  export default function NavbarDashboardClient() {
   // const { colorMode, toggleColorMode } = useColorMode(); ***** bg={useColorModeValue("gray.100", "gray.900")} px={4}
  
    return (
      <>
        <Box >
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            direction={{ base: "column", md: "row" }}
          >
            <Flex
              flex={{ base: "0 0 100%", md: "0 0 20%" }}
              justifyContent="center"
            >
              <Link to="/" textDecoration="none">
                <Image
                  src={logo}
                  alt="Logo"
                  maxW={{ base: "70%", md: "100%" }}
                  height="auto"
                />
              </Link>
            </Flex>
  
            <HStack
              spacing={4}
              alignItems="center"
              flex={1}
              justifyContent="center"
              mt={{ base: 4, md: 0 }}
            >
              <Link
                to="/"
                variant="outline"
                color={useColorModeValue("gray.700", "gray.200")}
                textDecoration="none"
              >
                Home
              </Link>
              <Link
                variant="solid"
                colorScheme="green"
                borderRadius="md"
                px={4}
                py={2}
                fontWeight="bold"
                textDecoration="none"
                _hover={{ opacity: 0.8 }}
              >
                Categorias
              </Link>
              <Link
                variant="solid"
                colorScheme="green"
                borderRadius="md"
                px={4}
                py={2}
                fontWeight="bold"
                textDecoration="none"
                _hover={{ opacity: 0.8 }}
              >
                Ayuda
              </Link>
            </HStack>
  
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                {/* <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button> */}
  
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <VStack spacing={2}>
                      <Avatar
                        size={"2xl"}
                        src={"https://avatars.dicebear.com/api/male/username.svg"}
                      />
                      <p>Usuario</p>
                    </VStack>
                    <MenuDivider />
                    <MenuItem>Ver mi Perfil</MenuItem>
                    <MenuItem>Editar Perfil</MenuItem>
                    <MenuItem>Cerrar Sesión</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
       
      </>
    );
  }
  