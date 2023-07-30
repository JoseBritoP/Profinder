/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import { Textarea } from '@chakra-ui/textarea'
import { useToast } from '@chakra-ui/toast'

export default function NewPost ({ isOpen, onClose }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const toast = useToast()
  const responsiveModal = {
    base: 'sm',
    md: 'xl',
    lg: 'xl'
  }

  function handleChange (event) {
    const value = event.target.value
    setUrl(value)
    setError(value)
    console.info(url)
  }

  function handleSubmit (event) {
    event.preventDefault()
    onClose()
    setError('')
    setUrl('')
    toast({
      title: 'Publicacion creada',
      description: 'Pudes verla en tu feed de publicaciones',
      status: 'success',
      position: 'top-right',
      duration: 4000,
      isClosable: true
    })
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={responsiveModal}
      >
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent
            bg={useColorModeValue('gray.900', 'gray.800')}
            color='gray.300'
          >
            <ModalHeader>Nueva publicacion</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Textarea
                placeholder='Agregar una descripcion a tu publicacion'
                mt={1}
                rows={3}
                shadow='sm'
                focusBorderColor='brand.400'
                fontSize={{
                  sm: 'sm'
                }}
              />
              <FormControl isInvalid={error}>
                <FormLabel>Imagen</FormLabel>
                <Input type='url' onChange={handleChange} isRequired />
                {error === ''
                  ? (
                    <FormHelperText>
                      Ingresa la URL de la imagen para tu publicacion
                    </FormHelperText>
                    )
                  : (
                    <FormErrorMessage>TODO: Validar este campo</FormErrorMessage>
                    )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                variant='ghost'
                type='submit'
                bg={useColorModeValue('gray.50', 'gray.50')}
                _hover={{ bg: 'gray.400' }}
              >
                Publicar
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
