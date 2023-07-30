/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react';

const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  const { colorMode } = useColorMode();
  const gradientStart = useColorModeValue('gray.200', 'gray.600');
  const gradientEnd = useColorModeValue('gray.300', 'gray.700');
  const gradient = `linear(to-r, ${gradientStart}, ${gradientEnd})`;

  return (
    <Stack
      bgGradient={gradient}
      boxShadow='2xl'
      p={8}
      rounded='xl'
      align='center'
      pos='relative'
      maxWidth='20rem'
      _after={{
        content: '""',
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: gradientStart,
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => {
  return (
    <Heading as='h3' fontSize='xl'>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text textAlign='center' color={useColorModeValue('gray.600', 'gray.200')} fontSize='sm'>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  const textColor2 = useColorModeValue('blue.900', 'blue.400');
  return (
    <Flex align='center' mt={8} direction='column'>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align='center'>
        <Text fontWeight={600}>
          <Text as='span' color={useColorModeValue('gray.800', 'gray.100')}>
            {name}
          </Text>
        </Text>
        <Text fontSize='sm' color={textColor2}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function TestimonialCarrousel() {
  const { colorMode } = useColorMode();
  const backgroundColor = colorMode === 'dark' ? undefined : 'gray.100';
  const textColor = useColorModeValue('blue.900', 'blue.400');


  return (
    <Box h='100%' w='100%' backgroundColor={backgroundColor}>
      <Container py={16} as={Flex} justify='center' align='center' direction='column' w='100%' maxW='100%'>
        <Stack spacing={0} align='center' mb={12}>
          <Heading color={useColorModeValue('gray.900', 'white')}>NUESTROS USUARIOS OPINAN!</Heading>
          <Text color={textColor}>
            Tenemos usuarios alrededor de todo el mundo
          </Text>
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 10, md: 4, lg: 10 }}>
          <br />
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Un cambio significativo en mi vida!</TestimonialHeading>
              <TestimonialText color='gray.300'>
                Esta aplicación ha podido contactarme con muchas soluciones a los conflictos de la vida cotidiana.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src='https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
              name='Jane Cooper'
              title='Usuaria de Mexico'
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading color='gray.300'>Diseño intuitivo!</TestimonialHeading>
              <TestimonialText>
                El sitio tiene un diseño elegante y de fácil navegación. 
                Hace excelente la experiencia del usuario!
                <br />
                Pensado para todos los dispositivos!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src='https://vivolabs.es/wp-content/uploads/2022/03/perfil-hombre-vivo.png'
              name='Jim Morrison'
              title='Usuario de Colombia'
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading color='gray.300'>Servicios cerca de casa!</TestimonialHeading>
              <TestimonialText>
                 Ahora puedo acceder a los servicios que estan cerca de mi unicación!
                 <br />
                 Nunca fue tan fácil contactar un trabajo con garantía de confianza!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src='https://plus.unsplash.com/premium_photo-1687832783320-35671afbf484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
              name='Soledad Silveira'
              title='Usuaria de Argentina'
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}