/* eslint-disable react/prop-types */
import {
  Badge, useColorModeValue
} from '@chakra-ui/react'

export default function Tag ({ textTag }) {
  const bgAccentElement = useColorModeValue('teal.300', 'teal.300')
  const txtColor = useColorModeValue('gray.700', 'gray.100')

  return (
    <Badge
      px={2}
      py={1}
      bg={bgAccentElement}
      color={txtColor}
      fontWeight='400'
      
    >
      {textTag}
    </Badge>
  )
}
