import { Grid, Box, Text, Image, Link, Icon, Heading, useMediaQuery, useColorModeValue, useColorMode} from '@chakra-ui/react';
import { FiLinkedin, FiGithub } from 'react-icons/fi';


const peopleData = [
  {
    name: 'John Alexander Paez Arias',
    email: 'johpaz252@gmail.com',
    linkedinURL: ' https://www.linkedin.com/in/john-alexander-paez-arias-543b0254/',
    githubURL: ' https://github.com/johpaz/',
    title: 'Software Engineer',
    country: ' Colombia',
    imageUrl: 'https://media.licdn.com/dms/image/D4E03AQEkKxpfNHYmYQ/profile-displayphoto-shrink_800_800/0/1665264047527?e=1695859200&v=beta&t=vcGjlxunEMY0Y2BeUFflgz5Z7GmSUsYGma3a6Qs0mI0',
    
  }, {
    name: 'Christian Valentin Maidana',
    email: 'chrismai1020162016@hotmail.com',
    linkedinURL: 'https://www.linkedin.com/in/christian-maidana-260611217/',
    githubURL: ' https://github.com/Christian5262',
    title: 'Software Engineer',
    country: 'Argentina',
    imageUrl: 'https://media.licdn.com/dms/image/D4D03AQEPHQvfl3lIgw/profile-displayphoto-shrink_800_800/0/1690153547052?e=1695859200&v=beta&t=6J1VfkyQgyoFN8CqJPmm8UDT-d4QiemEUolOoZ6K028',
    
  }, {
    name: 'Josue Evangelista Cruz',
    email: 'josueev.cruz@gmail.com',
    linkedinURL: 'https://www.linkedin.com/in/josue-evangelista-cruz-213461264/',
    githubURL: 'https://github.com/JosueEC',
    title: 'Backend Developer',
    country: 'México',
    imageUrl: 'https://media.licdn.com/dms/image/D4E03AQHbd9Z6oDfV0g/profile-displayphoto-shrink_800_800/0/1680539371902?e=1695859200&v=beta&t=ezOQflgMedBCZ3afw7ykQqNreulJSXWq6AUACdSJ0p4',
    
  }, {
    name: 'Maria José Olaechea',
    email: 'olaecheamariajose@gmail.com',
    linkedinURL: 'https://www.linkedin.com/in/mjolaechea/',
    githubURL: 'https://github.com/OLAEMJO8',
    title: 'Software Engineer',
    country: 'Argentina',
    imageUrl: 'https://media.licdn.com/dms/image/D4D03AQFM8yYaQS8S4Q/profile-displayphoto-shrink_800_800/0/1666745756157?e=1695859200&v=beta&t=1JB53SXVkTq6Rshgwkt9_RU-eWXx5zAq5riuREjKrZU',
   
  }, {
    name: 'José Brito',
    email: 'josealbritose@gmail.com',
    linkedinURL: 'https://www.linkedin.com/in/jos%C3%A9-brito-72224025b/',
    githubURL: 'https://github.com/josebritop',
    title: 'Software Engineer',
    country: 'Argentina',
    imageUrl: 'https://media.licdn.com/dms/image/D4D03AQEMMFSpnebLHQ/profile-displayphoto-shrink_800_800/0/1690386599543?e=1695859200&v=beta&t=kfi6ziSmzzW7IXjTA-RfciqVUmymEsW12BPgbCvw_ZA',
   
  }, {
    name: 'Cristian Cuesta',
    email: 'ccdavid007@gmail.com',
    linkedinURL: 'https://www.linkedin.com/in/cristiancuestabenitez/',
    githubURL: 'https://github.com/CristianCuesta14',
    title: 'Software Engineer',
    country: 'Colombia',
    imageUrl: 'https://media.licdn.com/dms/image/D4E03AQHoUuviieQLnw/profile-displayphoto-shrink_800_800/0/1683424883157?e=1695859200&v=beta&t=bUy3yZ92IUi3o0aiAng1v9JccZURUKOo4siCPXqb8Yg',
   
  },, {
    name: 'Agustin Boasso',
    email: 'boassoagustin@gmail.com',
    linkedinURL: 'https://www.linkedin.com/in/agustin-boasso-/',
    githubURL: 'https://github.com/agustinboasso',
    title: 'Software Engineer',
    country: 'Argentina',
    imageUrl: 'https://media.licdn.com/dms/image/D4D03AQEO8Bj8Ae5HDQ/profile-displayphoto-shrink_800_800/0/1670810727142?e=1695859200&v=beta&t=OOt7RIfxK3MhWQ6E-OVZdbMt9FGNERfa4VTU9Xm7C0k',
  
  }, {
    name: 'Nathaly Quiva',
    email: 'nathalyquiva2@gmail.com',
    linkedinURL: 'https://www.linkedin.com/in/nathalyquiva/',
    githubURL: 'https://github.com/NathalyQuiva',
    title: 'Desarrollador FullStack y Máster en Ingeniería',
    country: 'Colombia',
    imageUrl: 'https://media.licdn.com/dms/image/D4E03AQEurNuSEj2-Ug/profile-displayphoto-shrink_200_200/0/1690206522703?e=1695859200&v=beta&t=JSmlkhkSnSpGgq2CqIL4gpxh8l9hmA6gz6JZ0Gqs15g',
    
  }
 
];



const AboutUs = () => {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.100', 'gray.800');

    const [isLargerThanSm] = useMediaQuery("(min-width: 30em)");
    const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
    const [isLargerThanLg] = useMediaQuery("(min-width: 62em)");
    const cardBgColor = colorMode === 'light' ? 'white' : bgColor;

    let columnCount;
    if (isLargerThanLg) {
      columnCount = 4;
    } else if (isLargerThanMd) {
      columnCount = 3;
    } else if (isLargerThanSm) {
      columnCount = 2;
    } else {
      columnCount = 1;
    }
  
  
        return (
          <Box py={{ base: 8, md: 18 }} px={4} textAlign="center" bg={bgColor}>
            <Heading fontSize={{ base: "3xl", md: "4xl" }} color="teal.400" mb={4}>
              CONOCE A NUESTRO EQUIPO
            </Heading>
            <Text color={useColorModeValue('blue.900', 'blue.400')} fontSize={{ base: "lg", md: "xl" }} maxW="600px" mx="auto" mb={8}>
              Esta página está elaborada por un equipo interdisciplinario, comprometido a realizar desarrollo FullStack de calidad.
            </Text>
      
            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
              {peopleData.map((person, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg={cardBgColor}>
                  <Image src={person.imageUrl} alt={person.name} borderRadius="full" boxSize="150px" mx="auto" mb={4} />
      
                  <Text fontWeight="bold" fontSize="xl" mb={2}>
                    {person.name}
                  </Text>
      
                  <Text fontSize="sm" color="teal.500" mb={2}>
                    {person.title}
                  </Text>
      
                  <Text fontSize="sm" mb={2}>
                    {person.email}
                  </Text>
      
                  <Box display="flex" justifyContent="center" mb={2}>
                    <Link href={person.linkedinURL} isExternal mx={2}>
                      <Icon as={FiLinkedin} boxSize={6} color="teal.500" />
                    </Link>
                    <Link href={person.githubURL} isExternal mx={2}>
                      <Icon as={FiGithub} boxSize={6} color="teal.500" />
                    </Link>
                  </Box>
      
                  <Text fontSize="sm" mb={2}>
                    {person.phoneNumber}
                  </Text>
      
                  <Text fontSize="sm" mb={2}>
                    {person.country}
                  </Text>
      
                  <Text fontSize="sm" textAlign="justify">
                    {person.description}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        );
      };
      
      export default AboutUs;