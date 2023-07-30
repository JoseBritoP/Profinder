import { InfoIcon } from '@chakra-ui/icons'
import { Box, Heading, Text } from '@chakra-ui/layout'

export default function NoResults () {
  return (
    <Box
      textAlign='center'
      py={10}
      px={6}
    >
      <InfoIcon
        boxSize='60px'
        color='blue.500'
      />
      <Heading
        as='h2'
        size='2xl'
        mt={6}
        mb={2}
      >
        Lo sentimos
      </Heading>
      <Text
        color='gray.500'
        fontSize='xl'
      >
        No encontramos ningun resultado. Intentalo de nuevo.
      </Text>
    </Box>
  )
}
