/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Heading, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import { emailRules } from '../../views/UserLogin/loginValidations'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

export default function ModalForgotPassword ({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [textButton, setTextButton] = useState('Enviar enlace')
  const [textModal, setTextModal] = useState('Ingresa el correo electronico con el que te registrate y recibirás un correo con un enlace de restablecimiento.')
  const toast = useToast()

  const customSubmit = async (data) => {
    console.info(data)
    setTextButton('Enviar de nuevo')
    setTextModal(`Hemos enviado un enlace para recuperar tu contraseña a ${data.email} revisa tu bandeja de entrada`)
    const response = await axios.post(`https://backprofinder-production.up.railway.app/login?forgotPassword=${data.email}`)
    toast({
      title: `Enlace enviado a ${data.email}`,
      description: 'Revisa tu bandeja de entra y/o spam',
      status: 'success',
      duration: 5000,
      position: 'bottom-right',
      isClosable: true
    })
    console.info(response.data)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              ¿Has olvidado tu contraseña? No te preocupes
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(customSubmit)}>
              <Text
                mb={5}
                fontSize={{ base: 'sm', sm: 'lg' }}
                color={useColorModeValue('gray.800', 'gray.400')}
              >
                {textModal}
              </Text>
              <FormControl color='gray.300' isInvalid={errors.email}>
                <Input
                  type='email'
                  focusBorderColor={errors.email ? 'red.500' : 'teal.400'}
                  placeholder='ejemplo@gmail.com'
                  {...register('email', emailRules)}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button
              colorScheme='blue'
              // type='submit'
              onClick={handleSubmit(customSubmit)}
            >
              {textButton}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
