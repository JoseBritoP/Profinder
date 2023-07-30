/* eslint-disable react/prop-types */
import { useColorModeValue } from '@chakra-ui/color-mode'
import {
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber
} from '@chakra-ui/stat'

export default function Statistic ({ label, number, helpText }) {
  return (
    <Stat
      bg={useColorModeValue('white', 'gray.800')}
      textAlign='center'
      borderRadius='0.3rem'
    >
      <StatLabel>{label}</StatLabel>
      <StatNumber>{number}</StatNumber>
      <StatHelpText>{helpText}</StatHelpText>
    </Stat>
  )
}
