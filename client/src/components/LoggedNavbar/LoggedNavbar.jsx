/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  useToast,
  useColorMode
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useSessionState } from '../../services/zustand/useSession'
import NavLink from '../../singleComponents/NavLink'
import Logo from '../../assets/categoriesIcons/Logo.png'
import logodark from "../../assets/categoriesIcons/logodark.png";
import SinFoto from '../../assets/defaultImages/sinfoto.webp'
import DarkModeToggle from '../../utils/Darkmode/DarkmodeToggle'
import { useSelector } from "react-redux";

export default function LoggedNavbar () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const toast = useToast()
  const session = useSessionState(state => state.session)
  const { colorMode } = useColorMode();
  const removeSessionState = useSessionState(state => state.removeSessionState)
  const profesionalesimg = useSelector((state) => state.profesionales);

  // const filteredImage = profesionalesimg.filter((image) => image.id === session.id);
  // console.log(filteredImage)

  function handleLogout () {
    removeSessionState()
    window.localStorage.removeItem('userSession')
    window.localStorage.removeItem('rol')
    toast({
      title: 'Sesion finalizada',
      description: 'Esperamos verte de nuevo',
      status: 'success',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true
    })
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    navigate('/')
  }

  return (
    <nav style={{
       position: "sticky",
      //position: "fixed",
      width: '100%',
      top: 0,
      zIndex: 100,
    }}>
      <Box
        bg={useColorModeValue('gray.200', 'gray.900')}
        px='40px'
        py='10px'
      >
        <Flex
          h={16}
          alignItems='center'
          justifyContent='space-between'
        >
          <IconButton
            size='lg'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label='Open Menu'
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems='center'
          >
            <Box onClick={() => navigate('/')} _hover={{ cursor: 'pointer' }}>
              <Image
                src={colorMode === "light" ? Logo : logodark}
               width={{ base: "50%", md: "100%", lg: "100%" }}
               height="70px"
              />
            </Box>
            <HStack
              as='nav'
              spacing={10}
              display={{ base: 'none', md: 'flex' }}
              fontSize='1.15rem'
              fontWeight='bold'
            >
              <NavLink textLink='¿COMO FUNCIONA?' routeLink='/comofunciona' />
              <NavLink textLink='PROFESIONALES' routeLink='/categories' />
              <NavLink textLink='CONTACTO' routeLink='/feedback' />
              <NavLink textLink='ACERCA DE' routeLink='/aboutus' />
            </HStack>
          </HStack>
          <DarkModeToggle />
          <Flex
            alignItems='center'
          >
            <Menu>
              <MenuButton
                as={Button}
                rounded='full'
                variant='link'
                cursor='pointer'
                minW={0}
              >
                <Avatar
                  size={{ base: 'md', md: 'lg', lg: 'lg' }}
                  src={ session.image || SinFoto}
                />
              </MenuButton> 
              <MenuList>
                {
                (session.usuario === 'c')
                  ? <MenuItem onClick={() => navigate('/dashboardClient')}>Dashboard</MenuItem>
                  : session.usuario === 'p'
                    ? <MenuItem onClick={() => navigate('/dashboardSuppliers')}>Dashboard</MenuItem>
                    : session.usuario === 'a'
                      ? <MenuItem onClick={() => navigate('/dashboardAdmin/manageProfesional')}>Dashboard</MenuItem>
                      : null
                }
                {/* {
                  (session.usuario === 'p')
                    ? <MenuItem onClick={() => navigate('/detail/suplier/:id')}>Ver mi perfil</MenuItem>
                    : null
                } */}
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Cerrar sesion</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen
          ? (
            <Box
              pb={4}
              display={{ md: 'none' }}
            >
              <Stack as='nav' spacing={4}>
                <NavLink textLink='¿Como funciona?' routeLink='/comofunciona' />
                <NavLink textLink='Profesionales' routeLink='/categories' />
                <NavLink textLink='Contacto' routeLink='/feedback' />
                <NavLink textLink='Acerca de' routeLink='/aboutus' />
              </Stack>
            </Box>
            )
          : null}
      </Box>
    </nav>
  )
}
