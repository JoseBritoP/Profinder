import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useCredentials } from '../../utils/customHooks/useCredentials'
import { postSessionUser } from '../../services/redux/actions/actions'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import DropdownMenu from '../../singleComponents/DropdownMenu'

export default function UserRegister () {
  const disptach = useDispatch()
  const {
    userTypes,
    usuario,
    dataSession,
    showPassword,
    setShowPassword,
    handleChange,
    handleSelectUser,
    handleUserSession
  } = useCredentials()

  async function handleSubmit (event) {
    event.preventDefault()
    await disptach(postSessionUser(dataSession))
    handleUserSession('Cuenta creada', 'Algo salio mal')
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.800', 'gray.800')}
    >
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading
            fontSize='4xl'
            textAlign='center'
            bgGradient='linear(to-l, teal.300, green.400)'
            bgClip='text'
          >
            Registrate
          </Heading>
          <Text fontSize='lg' color='gray.50'>
            para disfrutar de todos nuestros servicios
          </Text>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('blackAlpha.800', 'gray.800')}
          color='gray.50'
          boxShadow='lg'
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <HStack>
              <Box>
                <FormControl id='name' isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input type='text' onChange={handleChange} />
                </FormControl>
              </Box>
              {/* <Box>
                <FormControl id='apellido'>
                  <FormLabel>Apellido</FormLabel>
                  <Input type='text' />
                </FormControl>
              </Box> */}
            </HStack>
            <FormControl id='email' isRequired>
              <FormLabel>Correo electronico</FormLabel>
              <Input type='email' onChange={handleChange} />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={handleChange} />
                <InputRightElement h='full'>
                  <Button
                    variant='ghost'
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <DropdownMenu
              titleMenu={usuario}
              menuItems={userTypes}
              onClick={handleSelectUser}
            />
            <Stack spacing={10} pt={2}>
              <Button
                type='submit'
                loadingText='Registrando'
                size='lg'
                bg='blue.400'
                color='white'
                _hover={{
                  bg: 'blue.500'
                }}
              >
                Registrar
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align='center'>
                Ya tienes una cuenta? ingresa desde aqui <Link to='/userLogin'>Login</Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
