import { Box, Text, Stack, Heading, Icon, Center, Spacer, useColorModeValue } from '@chakra-ui/react';
import { MdHelp, MdStar } from 'react-icons/md';

const IntroductionDash = () => {
  const iconColor = useColorModeValue('teal.500', 'teal.300');
  const headingColor = useColorModeValue('gray.900', 'gray.100'); // Updated color for the heading
  const textColor2 = useColorModeValue('blue.900', 'blue.400');
  
  return (
    <Box
      width="100%"
      bg={useColorModeValue('gray.100', 'gray.800')}
     
    
      p={4}
    >
      <Center>
        <Stack spacing={4} align="center">
          <Icon as={MdStar} boxSize={10} color={iconColor} /> {/* Increased icon size */}
          <Heading as="h2" size="lg" textAlign="center" color={headingColor}>
            ¡Bienvenido al Panel de Administración de Cliente!
          </Heading>
          <Spacer />
          <Text fontSize="lg" textAlign="center" color={useColorModeValue('gray.900','gray.100')}>
            Aquí podrás realizar las siguientes acciones:
          </Text>
          <Box>
            <Text fontSize="md" color={textColor2}> {/* Updated option text color */}
              <Icon as={MdStar} boxSize={6} color={iconColor} /> Editar todas tus preferencias.
            </Text>
            <Text fontSize="md" color={textColor2}> {/* Updated option text color */}
              <Icon as={MdStar} boxSize={6} color={iconColor} /> Consultar las categorías disponibles.
            </Text>
            <Text fontSize="md" color={textColor2}> {/* Updated option text color */}
              <Icon as={MdStar} boxSize={6} color={iconColor} /> Ver los profesionales mejor valorados.
            </Text>
            <Text fontSize="md" color={textColor2}> {/* Updated option text color */}
              <Icon as={MdStar} boxSize={6} color={iconColor} /> Hacer el feedback de los servicios prestados para valorar a los profesionales por su desempeño.
            </Text>
            <Text fontSize="md" color={textColor2}> {/* Updated option text color */}
              <Icon as={MdHelp} boxSize={6} color={iconColor} /> Acceder a la sección de ayuda y preguntas frecuentes.
            </Text>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
};

export default IntroductionDash;
