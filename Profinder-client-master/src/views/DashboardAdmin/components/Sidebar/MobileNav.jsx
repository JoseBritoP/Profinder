import { IconButton } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { SettingsIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/layout'

/* eslint-disable react/prop-types */
export default function MobileNav ({ onOpen, ...rest }) {
  return (
    <Flex
      ml={{ base: 0, md: 0, lg: 60 }}
      px={{ base: 4, md: 4, lg: 24 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      justifyContent='flex-start'
      {...rest}
    >
      <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label='open menu'
        icon={<SettingsIcon />}
      />
    </Flex>
  )
}
