
import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

const options = [
  { id: 1, desc: '1 lorem ipsum' },
  { id: 2, desc: 'Lorem, ipsum dolor.' },
  { id: 3, desc: 'Monthly Updates' },
];

const PackageTier = ({ title, options, typePlan, checked = false }) => {
  // Colores en modo light (mismos que en el componente TopPro)
  const colorTextLight = checked ? 'black' : 'purple.600';
  const bgColorLight = checked ? 'purple.400' : 'gray.100'; // Cambio a gris claro

  // Colores en modo dark (mismos que en el componente TopPro)
  const colorTextDark = checked ? 'white' : 'purple.500';
  const bgColorDark = checked ? 'purple.400' : 'gray.100'; // Cambio a gris claro

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: 'flex-start',
        md: 'space-around',
      }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems={{ md: 'center' }}
    >
      <Heading size={'md'}>{title}</Heading>
      <List spacing={3} textAlign="start">
        {options.map((desc) => (
          <ListItem key={desc.id}>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Text color={useColorModeValue('black', 'gray.100')}>{desc.desc}</Text> {/* Cambio a color blanco o gris claro */}
          </ListItem>
        ))}
      </List>
      <Heading size={'xl'}>{typePlan}</Heading>
      <Stack>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
        >
          Get Started
        </Button>
      </Stack>
    </Stack>
  );
};

const PricingHome = () => {
  // Colores en modo light (mismos que en el componente TopPro)
  const bgColorLight = 'gray.50';
  const textColorLight = 'gray.600';

  // Colores en modo dark (mismos que en el componente TopPro)
  const bgColorDark = 'gray.800';
  const textColorDark = 'gray.300';

  return (
    <Box py={6} px={5} min={'100%'}>
      <Stack spacing={4} width={'100%'} direction={'column'}>
        <Stack
          p={5}
          alignItems={'center'}
          justifyContent={{
            base: 'flex-start',
            md: 'space-around',
          }}
          direction={{
            base: 'column',
            md: 'row',
          }}
        >
          <Stack
            width={{
              base: '100%',
              md: '40%',
            }}
            textAlign={'center'}
          >
            <Heading size={'lg'} color={useColorModeValue('black', 'white')}>
              The Right Plan for <Text color="purple.400">Your Business</Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: '100%',
              md: '60%',
            }}
          >
            <Text textAlign={'center'} color={useColorModeValue(textColorLight, textColorDark)}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              quod in iure vero. Facilis magnam, sed officiis commodi labore
              odit.
            </Text>
          </Stack>
        </Stack>
        <Divider />
        <PackageTier
          title={'Lorem Plus'}
          checked={true}
          typePlan="$32.00"
          options={options}
        />
      </Stack>
    </Box>
  );
};

export default PricingHome;