import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  useColorMode,
  useColorModeValue // Importar useColorMode
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

// Replace test data with your own
const features = [
  {
    id: 1,
    title: 'No salgas de tu casa',
    text: 'Nuestro sitio permite ubicar los servicios que esten dentro de tu zona'
  },
  {
    id: 2,
    title: 'Transaccion segura',
    text: 'Somos garantía del servicio que ofrecen las personas del sitio'
  },
  {
    id: 3,
    title: 'Busqueda focalizada',
    text: 'Navega entre nuestras categorias para dar exactamente con lo que estas buscando'
  },
  {
    id: 4,
    title: 'Tu opinion importa',
    text: 'Nuestro sitio es una experiencia basada en el usuario. Por lo que tu interaccion es muy valiosa para nosotros'
  }
];

export default function FeaturesGrid() {
  const { colorMode } = useColorMode();

  // Definir el color de fondo según el modo de color
  const backgroundColor = colorMode === 'dark' ? undefined : 'gray.100';
  const textColor = useColorModeValue('blue.900', 'blue.400');
  const colorText = useColorModeValue('blue.900', 'gray.100');
  const titleColor = useColorModeValue('gray.900','gray.100');


  return (
    <Box p={4} h='100%' width='100%' backgroundColor={backgroundColor}>
      <Stack spacing={4} as={Container} maxW='3xl' textAlign='center' color={titleColor}>
        <Heading fontSize='3xl'>UNA SOLUCIÓN PARA CADA NECESIDAD</Heading>
        <Text color={textColor} fontSize='xl'>
          Esta página ofrece muchas ventajas. Nuestro servicio se encarga de hacer el match perfecto para la solucion a tus problemas.
        </Text>
      </Stack>

      <Container maxW='6xl' mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align='top'>
              <Box color='teal.400' px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align='start'>
                <Text fontWeight={600} color={colorText}>
                  {feature.title}
                </Text>
                <Text color={useColorModeValue('gray.600', 'white')}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}