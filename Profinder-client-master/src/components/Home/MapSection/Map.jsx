import { Box, Text, Heading, Flex, useColorMode, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import MapSection from './MapSection';


const Map = () => {
  const { colorMode } = useColorMode();
  const backgroundColor = colorMode === 'dark' ? 'gray.800' : 'gray.500';
  const titleColor = colorMode === 'dark' ? 'teal.400' : 'teal.400';
  const descriptionColor = colorMode === 'dark' ? 'blue.400' : 'blue.800';
  const exampleDescriptionColor = colorMode === 'dark' ? 'blue.400' : 'blue.800';

  return (
    <Box backgroundColor={backgroundColor} p={4}>
      <Heading fontSize={{ base: '3xl', sm: '4xl' }} fontWeight="bold" textAlign="center" color="gray.100" mb={4}>
       NUESTROS PROFESIONALES POR EL MUNDO!
      </Heading>

      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" mb={4}>
        <Box textAlign="center" p={4} flex="1">
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight="bold" color={titleColor} borderColor="blue.900">
            Ubicación de nuestros profesionales.
          </Heading>
          <Text fontSize={{ base: 'lg', sm: 'xl' }} fontWeight="bold" mt={4} color={descriptionColor}>
            Aquí verás donde están ubicados nuestros profesionales a lo largo de todo Latinoamérica.
          </Text>
        </Box>

        <Box flex="1">
         {/* <MapSection />  */}
        </Box>

        <Box p={4} flex="1" display="flex" flexDirection="row" flexWrap="wrap">
          <List spacing={3}>
            <ListItem fontSize={{ base: 'sm', sm: 'md' }} color={exampleDescriptionColor} display="flex" alignItems="center">
              <ListIcon as={CheckIcon} color={titleColor} />
              Observá la ubicación de nuestros profesionales.
            </ListItem>
            <ListItem fontSize={{ base: 'sm', sm: 'md' }} color={exampleDescriptionColor} display="flex" alignItems="center">
              <ListIcon as={CheckIcon} color={titleColor} />
              Asegurate de marcar tu zona en el mapa.
            </ListItem>
            <ListItem fontSize={{ base: 'sm', sm: 'md' }} color={exampleDescriptionColor} display="flex" alignItems="center">
              <ListIcon as={CheckIcon} color={titleColor} />
              Corroborá la categoria y la ubicación.
            </ListItem>
            <ListItem fontSize={{ base: 'sm', sm: 'md' }} color={exampleDescriptionColor} display="flex" alignItems="center">
              <ListIcon as={CheckIcon} color={titleColor} />
              Búscalos y matchea con ellos a través del sitio!!
            </ListItem>
          </List>
        </Box>
      </Flex>
    </Box>
  );
};
export default Map;