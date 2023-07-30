/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button'

export default function ButtonMessage ({ textButton }) {
  const hoverStyles = {
    bg: 'teal.500'
  }

  return (
    <Button
      fontSize='sm'
      rounded='lg'
      bg='teal.400'
      color='white'
      _hover={hoverStyles}
    >
      {textButton}
    </Button>
  )
}
