import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'

export default function PrivacyNotice () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const responsiveModal = {
    base: 'sm',
    md: 'xl',
    lg: 'xl'
  }
  return (
    <>
      <Button
        onClick={onOpen}
        ml='10px'
        size='lg'
        bg='gray.400'
        color='gray.800'
        _hover={{
          bg: 'gray.600'
        }}
      >
        Politica de privacidad
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={responsiveModal}
      >
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue('gray.900', 'gray.800')}
          color='gray.300'
        >
          <ModalHeader color='gray.100'>POLÍTICA DE PRIVACIDAD Y CONTENIDO</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            · La app contiene funciones sociales como por ejemplo chats que tienen como objetivo permitir compartir información entre los usuarios.
            <br />
            <br />
            · En consecuencia la app puede solicitar al usuario que introduzca datos de carácter personal como por ejemplo fotografías o fecha de nacimiento.
            <br />
            <br />
            · Estos datos de carácter personal se muestran a los otros usuarios de la app. Estos datos no se comparten con ninguna otra entidad o terceras organizaciones.
            <br />
            <br />
            · El usuario puede eliminar sus datos de carácter personal dándose de baja de la app, mediante el enlace que hay para tal efecto en las opciones de perfil de usuario de la app.
            <br />
            <br />
            · No se acepta la publicación de contenido sólo para adultos como, por ejemplo, imágenes con contenido sexual o imágenes de extrema violencia.
            <br />
            <br />
            · Las imágenes y los videos introducidos por el usuario son enviados al servidor backprofinder-production.up.railway.app con el fin de poder ser recuperados posteriormente por el propio usuario, y con el fin de que la app pueda ofrecer las funcionalidades según su descripción.
            <br />
            <br />
            · Permitimos que terceras compañías publiquen anuncios y recopilen cierta información anónima cuando visite nuestra aplicación. Estas empresas pueden utilizar información anónima, como su ID de publicidad de Google, el tipo y la versión de su dispositivo, la actividad de navegación, la ubicación y otros datos técnicos relacionados con su dispositivo, a fin de proporcionar anuncios.
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={onClose}
            >
              Aceptar
            </Button>
            <Button
              bg='gray.400'
              onClick={onClose}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
