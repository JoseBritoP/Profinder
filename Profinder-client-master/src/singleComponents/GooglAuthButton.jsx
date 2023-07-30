/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/toast'
import { Button } from '@chakra-ui/button'
// import { useDispatch } from 'react-redux'
// import { loginSessionGoogle } from '../services/redux/actions/actions'
import jwt_decode from 'jwt-decode'

export default function GoogleAuthButton ({ setValue, getUserData }) {
  // const dispatch = useDispatch()
  const toast = useToast()

  async function handleCallbackResponse (response) {
    // dispatch(loginSessionGoogle())
    const userObject = jwt_decode(response.credential)

    setValue('name', userObject.name)
    setValue('email', userObject.email)
    setValue('password', `${userObject.given_name.toLowerCase()}GOOAT0`)

    const userData = {
      name: userObject.name,
      email: userObject.email,
      password: `${userObject.given_name.toLowerCase()}GOOAT0`
    }

    getUserData(userData)
    
    userObject && toast({
      title: 'Cuenta vinculada',
      description: 'Completa los demas campos para finalizar el registro',
      status: 'success',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true
    })
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
    <Button
      id='g_id_onload'
      bg='gray.50'
      h='50px'
      _hover={{
        bg: 'gray.50'
      }}
    />
  )
}
