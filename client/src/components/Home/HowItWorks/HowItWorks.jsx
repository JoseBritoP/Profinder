import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const { colorMode } = useColorMode();

  // Set text color based on the color mode
  const proTextColor = useColorModeValue('black', 'white');
  const finderTextColor = useColorModeValue('teal.400', 'teal.400');

  // Set the border color for Finder in dark mode

  // Definir el color de fondo según el modo de color
  const backgroundColor = colorMode === 'dark' ? 'gray.800' : 'gray.100';
  const colorText = useColorModeValue('black', 'white');

  return (
    <Flex
      minH="100%"
      direction={{ base: 'column', md: 'row' }}
      backgroundColor={backgroundColor} // Establecer el color de fondo
    >
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={6} w="full" maxW="lg" >
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as="span"
              position="relative"
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                zIndex: -1,
              }}
              className={styles['tracking-in-contract']}
              color={proTextColor} // Set the color for "Pro" based on the color mode
            >
              Pro
            </Text>
           
            <Text
              as="span"
              color={finderTextColor} // Set the color for "Finder" based on the color mode
             
              className={styles['tracking-in-contract']}
            >
              Finder
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={colorText}>
            Este sitio es un nexo entre problemas y soluciones. Tienes una
            necesidad, contactas con quien pueda solucionar y listo! Problema
            resuelto!!
            <br />
            Muchos profesionales nos eligen para postular sus servicios, al
            igual que muchos clientes satisfechos por el uso de nuestra
            plataforma.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              as={Link}
              to="/registerProvider"
              rounded="full"
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.400',
              }}
              className={`${styles['bounce-top']} ${styles.boton}`}
              shadow="md" // Add shadow to the "Registrate!" button
            
            >
              Registrate!
            </Button>

            <Button
              as={Link}
              to="/comofunciona"
              rounded="full"
              bg="teal.400"
              color="white"
              _hover={{
                bg: 'teal.600',
              }}
              className={styles['bounce-top']}
              shadow="md"
            >
              Como funciona?
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt="Login Image"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
      </Flex>
    </Flex>
  );
}
