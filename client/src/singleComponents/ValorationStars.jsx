import { StarIcon } from '@chakra-ui/icons'
import { Stack } from '@chakra-ui/layout'

export default function ValorationStars () {
  return (
    <Stack
      align='center'
      justify='center'
      direction='row'
      mb={2}
    >
      <StarIcon
        color='yellow'
        fontSize='4xl'
      />
      <StarIcon
        color='yellow'
        fontSize='4xl'
      />
      <StarIcon
        color='yellow'
        fontSize='4xl'
      />
      <StarIcon
        color='white'
        fontSize='4xl'
      />
      <StarIcon
        color='white'
        fontSize='4xl'
      />
    </Stack>
  )
}
