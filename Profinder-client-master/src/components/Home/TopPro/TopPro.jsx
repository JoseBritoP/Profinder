import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Center, Flex, Heading, Image, Stack, Text, useColorModeValue, Icon, useColorMode, Link } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { getAllSuppliers } from '../../../services/redux/actions/actions';
import { Link as RouterLink } from 'react-router-dom';
import { useSessionState } from "./../../../services/zustand/useSession";

const Card = ({ supplier, cardBgColor, textColor }) => {
  const ratingStars = Array.from({ length: supplier.rating }, (_, index) => (
    <Icon key={index} as={StarIcon} color="teal.400" />
  ));
  const session = useSessionState((state) => state.session);  
  const { colorMode } = useColorMode();
  const backgroundColor = colorMode === 'dark' ? undefined : 'gray.100';
  


  return (
    <Box borderWidth="1px" borderRadius="lg" bg={cardBgColor} boxShadow="2xl" p={4} backgroundColor={backgroundColor} >
      <Flex>
        <Box overflow="hidden" borderRadius="full" boxSize={{ sm: '80px', md: '150px' }}>
          <Image
            objectFit="cover"
            boxSize="100%"
            src={supplier.image}
            alt={supplier.name}
            fallbackSrc="https://via.placeholder.com/150"
          />
        </Box>
        <Stack justifyContent="center" alignItems="center" p={4} pl={6} spacing={2}>
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight="bold" mt={15}>
            {supplier.name}
          </Heading>
          <Text fontWeight={600} color={textColor} fontSize="sm" mb={2}>
            Categoría: {supplier.professions[0].category}
          </Text>
          <Text fontWeight={600} color={textColor} fontSize="sm" mb={2}>
            Valoracion:
            <Flex align="center" ml={2}>
              {ratingStars}
            </Flex>
          </Text>
          <Stack mt={8} direction="row" spacing={4} align="center" justify="center">
        {session.status === false ? (
          <Button as={RouterLink} to={`/userLogin`} mt={4} colorScheme="teal" size="sm">
          Inicia Sesión
        </Button>
        ) : (
          <Button as={RouterLink} to={`/detail/${supplier.id}`} mt={4} colorScheme="teal" size="sm">
            Ver detalle
          </Button>
        )}
      </Stack>
          {/* <Button as={RouterLink} to={`/detail/${supplier.id}`} mt={4} colorScheme="teal" size="sm">
            Ver detalle
          </Button> */}
        </Stack>
      </Flex>
    </Box>
  );
};

const TopPro = ({ cardBgColor,  linkColor }) => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(getAllSuppliers());
  }, [dispatch]);

  // Ordena los proveedores por rating de mayor a menor
  const sortedSuppliers = [...suppliers].sort((a, b) => b.rating - a.rating);
  const { colorMode } = useColorMode();
  const backgroundColor = colorMode === 'dark' ? undefined : 'gray.100';
  const textColor = useColorModeValue('blue.900', 'blue.400');

  return (
    <Center p={4}  h="100%" w="100%"   backgroundColor={backgroundColor}>
      <Box mx="auto" maxW="5xl" w="100%" >
        <Box textAlign="center">
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight="bold" mt={15} color={useColorModeValue('gray.900', 'white')} borderColor='blue.900'>
            PROFESIONALES MEJOR PUNTUADOS
          </Heading>
          <Text mt={4} color={textColor} >
            En esta sección encontrarás los profesionales con mejores calificaciones de nuestro sitio.
          </Text>
        </Box>
        <Box mt={8} align="center">
          <Box display="grid" gridGap={6} gridTemplateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)' }}>
            {sortedSuppliers.slice(0, 4).map((supplier) => (
              <Card key={supplier.id} supplier={supplier} cardBgColor={cardBgColor} textColor={textColor} />
            ))}
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default TopPro;