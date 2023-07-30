import { HStack } from '@chakra-ui/layout'
import { Button } from 'react-scroll'
import { useNavigate } from 'react-router'

export default function Credentials () {
  const navigate = useNavigate()
  return (
    <HStack
      display={{ base: 'none', md: 'block', lg: 'row' }}
      justifyContent='space-between'
    >
      <Button
        variant='solid'
        colorScheme='gray'
        size='md'
        mr={6}
        onClick={() => navigate('/userLogin')}
      >
        Iniciar sesion
      </Button>
      <Button
        variant='solid'
        colorScheme='blue'
        size='md'
        onClick={() => navigate('/userRegister')}
      >
        Registrarse
      </Button>
    </HStack>
  )
}
