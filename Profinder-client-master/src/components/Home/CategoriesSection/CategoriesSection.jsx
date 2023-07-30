import React from 'react';
import { Box, Button, Container, Flex, Heading, Stack, Text, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import consultoriaIcon from '../../../assets/categoriesIcons/consultoria.png';
import arteDiseñoIcon from '../../../assets/categoriesIcons/pintura.png';
import tecnologiaIcon from '../../../assets/categoriesIcons/informatica.png';
import serviciosIcon from '../../../assets/categoriesIcons/public-service.png';
import manualidadesIcon from '../../../assets/categoriesIcons/artesanias.png';

const Card = ({ heading, description, icon, cardBgColor, textColor, linkColor, iconBgColor }) => {
  return (
    <Box

      maxW={{ base: 'full', sm: '275px' }}
      w="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      bg={cardBgColor}
      color={textColor}
      boxShadow="2xl" // Agregar sombra al igual que en el componente TopPro
    >
      <Stack align="start" spacing={2}>
        <Flex
          w={16}
          h={16}
          align="center"
          justify="center"
          color="white"
          rounded="full"
          bg={iconBgColor}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize="sm">
            {description}
          </Text>
        </Box>
        
          <Button as={Link} to="/categories" variant="link" color={linkColor} size="sm">
            Leer más
          </Button>
        
      </Stack>
    </Box>
  );
};

const CategoriesSection = () => {
  // Colores en modo light (mismos que en el componente TopPro)
  const cardBgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const linkColor = useColorModeValue('teal.400', 'teal.400');
  const iconBgColor = useColorModeValue('gray.900', 'gray.700');
  const { colorMode } = useColorMode();
  const backgroundColor = colorMode === 'dark' ? undefined : 'gray.100';
  const textColor2 = useColorModeValue('blue.900', 'blue.400');
  

  // Resto del código del componente
  return (
    <Box p={4} h="100%" width="100%" backgroundColor={backgroundColor}>
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight="bold" color={useColorModeValue('gray.900', 'white')}>
            NUESTRAS CATEGORÍAS
          </Heading>
          <Text color={textColor2} fontSize={{ base: 'sm', sm: 'lg' }}>
            Estas son nuestras categorias donde puedes encontrar las ocupaciones de los servicios que procuras!
          </Text>
        </Stack>

        <Container maxW="5xl" mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Card
              heading="Tecnología"
              icon={<img src={tecnologiaIcon} alt="Tecnología" />}
              description="Aquí encontrarás ofertas de servicios en todo lo que respecta al área IT"
              cardBgColor={cardBgColor}
              textColor={textColor}
              linkColor={linkColor}
              iconBgColor={iconBgColor}
            />
            <Card
              heading="Arte y Diseño"
              icon={<img src={arteDiseñoIcon} alt="Arte y Diseño" />}
              description="Aquí encontraras desde diseñadores e ilustradores hasta decoradores de interior, escenógrafos, entre otros..."
              cardBgColor={cardBgColor}
              textColor={textColor}
              linkColor={linkColor}
              iconBgColor={iconBgColor}
            />
            <Card
              heading="Consultoría"
              icon={<img src={consultoriaIcon} alt="Consultoría" />}
              description="Aquí encontrarás todo tipo de consultorías"
              cardBgColor={cardBgColor}
              textColor={textColor}
              linkColor={linkColor}
              iconBgColor={iconBgColor}
            />
            <Card
              heading="Servicios"
              icon={<img src={serviciosIcon} alt="Servicios" />}
              description="Aquí encontrarás servicios generales."
              cardBgColor={cardBgColor}
              textColor={textColor}
              linkColor={linkColor}
              iconBgColor={iconBgColor}
            />
            <Card
              heading="Manualidades"
              icon={<img src={manualidadesIcon} alt="Manualidades" />}
              description="Aquí encontrarás productos de oficio. Desde orfebres, escultores hasta ceramistas y floristas"
              cardBgColor={cardBgColor}
              textColor={textColor}
              linkColor={linkColor}
              iconBgColor={iconBgColor}
            />
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default CategoriesSection;