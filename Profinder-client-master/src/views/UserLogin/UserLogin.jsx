/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  Divider,
  useToast,
  useBoolean
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useCredentials } from '../../utils/customHooks/useCredentials'
import { getSessionUser } from '../../services/redux/actions/actions'
import { emailRules } from './loginValidations'
import DropdownMenu from '../../singleComponents/DropdownMenu'
import ModalForgotPassword from '../../components/ModalForgotPassword/ModalForgotPassword'
import jwt_decode from 'jwt-decode'

export default function UserLogin () {
  const [loading, setLoading] = useBoolean()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [usuario, setUsuario] = useState('Tipo de usuario')
  const [rol, setRol] = useState('')

  const toast = useToast()
  const dispatch = useDispatch()

  const bgColor = useColorModeValue('gray.100', 'gray.800')
  const bgElement = useColorModeValue('white', 'gray.800')
  const txtColor = useColorModeValue('gray.600', 'gray.100')

  const {
    userTypes,
    errorRol,
    setErrorRol,
    handleUserSession
  } = useCredentials()

  function handleSelectUser (event) {
    const { name } = event.target
    let rolUser
    if (name === 'Cliente') {
      setRol('c')
      rolUser = 'c'
    }
    if (name === 'Profesional') {
      setRol('p')
      rolUser = 'p'
    }
    setUsuario(name)
    window.localStorage.setItem('rol', JSON.stringify(rolUser))
  }

  const customSubmit = async (data) => {
    if (rol !== '' || data.email === 'profinder943@gmail.com') {
      setLoading.on()
      setErrorRol(false)
      const dataSession = {
        email: data.email,
        password: data.password,
        usuario: (data.email === 'profinder943@gmail.com') ? 'a' : rol
      }
      await dispatch(getSessionUser(dataSession))
      setLoading.off()
      handleUserSession('Sesion iniciada', 'Algo salio mal')
    } else setErrorRol(true)
  }

  async function handleCallbackResponse (response) {
    const rol = JSON.parse(window.localStorage.getItem('rol'))
    const userObject = jwt_decode(response.credential)
    if (rol || userObject.email === 'profinder943@gmail.com') {
      const dataSessionGoogle = {
        name: userObject.name,
        email: userObject.email,
        password: userObject.email === 'profinder943@gmail.com' ? 'P1234567' : `${userObject.given_name.toLowerCase()}GOOAT0`,
        usuario: userObject.email === 'profinder943@gmail.com' ? 'a' : rol
      }

      await dispatch(getSessionUser(dataSessionGoogle))
      handleUserSession('Sesion iniciada', 'Algo salio mal')
    } else {
      toast({
        title: 'Usuario no especificado',
        description: 'Debes seleccionar el tipo de usuario con el que estas registrado',
        status: 'info',
        position: 'bottom-right',
        duration: 5000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: '298712469496-c4b7dmru4gl62him455vjft5a9k9hb98.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })
    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(
      document.getElementById('g_id_onload'),
      { theme: 'outline', size: 'large', data_width: '220px' }
    )
  }, [])

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={bgColor}
    >
      <Stack
        spacing={8}
        mx='auto'
        maxW='lg'
        py={12}
        px={6}
      >
        <Stack align='center'>
          <Heading
            fontSize='4xl'
            bgGradient='linear(to-l, teal.300, green.400)'
            bgClip='text'
          >
            Hola de nuevo!
          </Heading>
          <Text
            fontSize='lg'
            color={txtColor}
          >
            Ingresa para disfrutar de todos nuestros <Link color='teal.300'>servicios</Link>
          </Text>
        </Stack>
        <form onSubmit={handleSubmit(customSubmit)}>
          <Box
            // border='solid 2px red'
            rounded='lg'
            bg={bgElement}
            shadow='lg'
            p={8}
          >
            <Stack spacing={4}>
              <FormControl isInvalid={errors.email}>
                <FormLabel
                  color={txtColor}
                >
                  Correo electronico
                </FormLabel>
                <Input
                  type='email'
                  focusBorderColor={errors.email ? 'red.500' : 'teal.400'}
                  placeholder='ejemplo@gmail.com'
                  {...register('email', emailRules)}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel
                  color={txtColor}
                >
                  Contraseña
                </FormLabel>
                <Input
                  type='password'
                  focusBorderColor={errors.password ? 'red.500' : 'teal.400'}
                  {...register('password')}
                />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={4}>
                <DropdownMenu
                  titleMenu={usuario}
                  menuItems={userTypes}
                  onClick={handleSelectUser}
                />
                <Text
                  color='red.500'
                >
                  {errorRol && 'Selecciona un tipo de usuario'}
                </Text>
                <Divider
                  borderColor={txtColor}
                />
                <Stack spacing={5}>
                  <Button
                    id='g_id_onload'
                    bg='gray.50'
                    h='50px'
                    _hover={{
                      bg: 'gray.50'
                    }}
                  />
                  <Button
                    bg='teal.400'
                    color='white'
                    _hover={{ bg: 'teal.500' }}
                    isLoading={loading}
                    type='submit'
                    onClick={handleSubmit(customSubmit)}
                  >
                    Ingresar
                  </Button>
                  <Text
                    color={txtColor}
                    letterSpacing='0.5px'
                  >
                    ¿Olvidaste tu contraseña? click <Link to='#' style={{ color: 'cyan' }} onClick={onOpen}>aqui</Link>
                  </Text>
                  <ModalForgotPassword isOpen={isOpen} onClose={onClose} />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  )
}
