/* eslint-disable react/prop-types */
import { CloseButton } from '@chakra-ui/close-button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { EditIcon } from '@chakra-ui/icons'
import NavItem from './NavItem'

export default function SidebarContent ({ onClose, ...rest }) {
  const LinkItems = [
    { name: 'Profesionales', icon: EditIcon, linkRoute: '/dashboardAdmin/manageProfesional' },
    { name: 'Clientes', icon: EditIcon, linkRoute: '/dashboardAdmin/manageClient' },
    { name: 'Posteos', icon: EditIcon, linkRoute: '/dashboardAdmin/managePost' }
  ]

  const bgElement = useColorModeValue('white', 'gray.800')

  return (
    <Box // barra lateral sidebar
      bg={bgElement}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex
        h='20'
        alignItems='center'
        mx='8'
        justifyContent='space-between'
      >
        <Text
          fontSize='2xl'
          fontFamily='monospace'
          fontWeight='bold'
        >
          PROFINDER
        </Text>
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          linkRoute={link.linkRoute}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
