/* eslint-disable react/prop-types */
import { Icon } from '@chakra-ui/icon'
import { Text } from '@chakra-ui/layout'

export default function InfoLabel ({ textLabel, iconLabel }) {
  return (
    <Text
      fontWeight={600}
      color='gray.500'
      mb={2}
      fontSize='lg'
    >
      <Icon
        as={iconLabel}
        mr={2}
        color='teal.400'
      />
      {textLabel}
    </Text>
  )
}
