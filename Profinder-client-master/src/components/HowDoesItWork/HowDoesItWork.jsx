import { Box, VStack } from '@chakra-ui/layout';
import {
  Button,
  Collapse,
  Flex,
  Heading,
  Image,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import profesion from '../../assets/categoriesIcons/fontanero.png';
import leer from '../../assets/categoriesIcons/mecanico.png';
import SimpleAccordion from './simpleAcordion';

const HowDoesItWork = () => {
  const { colorMode } = useColorMode();


  // Set text color based on the color mode
  const textAcordionColor = useColorModeValue('black', "white")

  // Set the border color for Finder in dark mode

  // Definir el color de fondo según el modo de color
  const backgroundColor = colorMode === 'dark' ? 'gray.800' : 'gray.100';
  const acordionColor = colorMode === 'dark' ? 'gray.600' : 'white';
  const [showDetails, setShowDetails] = useState(null) // section para profesionales

  return (
    <Flex // Section completa
      direction='column'
      backgroundColor={backgroundColor}
    >
      <Flex // container de las tarjetas
        direction='row'
        justify='center'
        margin="1rem"
        gap='5rem' flexWrap="wrap" gridGap={6}
      >

        <ProfesionalCard id={1} showDetails={showDetails === 1} setShowDetails={setShowDetails} title='¿Eres un Profesional?' subtitle='¿Eres un profesional y quieres ofrecer tus servicios?' body='Haz tu publicación, ofrece tus servicios y contacta con miles de usuarios.' imageSrc={profesion} />

        <ProfesionalCard id={2} showDetails={showDetails === 2} setShowDetails={setShowDetails} title='¿Buscas un Profesional?' subtitle="¿Eres un cliente y quieres buscar servicios?" body='
        Encuentra al profesional ideal, da tu opinión y contacta fácilmente. ¡Todo en un solo lugar!' imageSrc={leer} />

      </Flex>
      <Flex p={5}>
        <SimpleAccordion backgroundColor={backgroundColor} acordionColor={acordionColor} textAcordionColor={textAcordionColor} />
      </Flex>

    </Flex>
  )
}
export default HowDoesItWork


function ProfesionalCard({ title, subtitle, body, imageSrc, showDetails, setShowDetails, id }) {

  const cardBgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const linkColor = useColorModeValue('teal.400', 'teal.400');
  const detailRef = useRef(null)

  useEffect(() => {
    if (detailRef.current) {
      setTimeout(() => {
        detailRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 50)
    }
  }, [showDetails])


  return (<Flex // card  Eres Profesional
    maxW={{ base: "max", sm: '400px' }}
    boxShadow='lg'
    p={8}
    rounded='lg'
    direction='column'
    align='center'
    width='400px'
    height='fit-content'
    w="full"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    bg={cardBgColor}
    color={textColor}
  >
    <Heading
      fontSize='3xl'
      bgGradient='linear(to-l, teal.300, green.400)'
      bgClip='text'
      textAlign='center'
    >
      {title}
    </Heading>
    <Link>
      <Box overflow='hidden'>
        <Image
          src={imageSrc}
          boxSize='250px'
          transform='scale(1.0)'
          alt='Icono profesional'
          objectFit='cover'
          transition='0.3s ease-in-out'
          _hover={{
            transform: 'scale(1.05)'
          }}
        />
      </Box>
    </Link>
    <Button
      width='80%'
      bg='blue.600'
      color='white'
      _hover={{ bg: 'blue.700' }}
      onClick={() => {
        if (!showDetails) {
          setShowDetails(id)
        } else {
          setShowDetails(null)
        }
      }}
    >
      {showDetails ? 'Ver Menos' : 'Ver Más'}
    </Button>
    <Collapse in={showDetails} animateOpacity>
      {showDetails && (
        <Box
          id='asdasd123'
          ref={detailRef}
          mt={4}
          maxW={{ base: 'full', sm: '275px' }}
          w="full"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={7}
          bg={cardBgColor}
          color={textColor}
          boxShadow="2xl"
        // 
        >
          <Heading as='h2' size='xl' marginBottom='4' color={linkColor}>
            {subtitle}
          </Heading>
          <VStack spacing='4' alignItems='flex-start'>

            <Button as={Link} to={id === 1 ? "/registerProvider" : "/registerCliente"} variant="link" color='blue.600' size="lg">
              ¡Regístrate!
            </Button>

            <Button as={Link} to="/userLogin" variant="link" color='blue.600' size="lg">
              Inicia sesión
            </Button>
            <Heading as='h3' size='md'>
              {body}
            </Heading>
          </VStack>
        </Box>
      )
      }
    </Collapse>

  </Flex>
  )
}