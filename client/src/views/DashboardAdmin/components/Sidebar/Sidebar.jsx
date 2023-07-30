/* eslint-disable react/prop-types */
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react'
import { useLocation } from 'react-router'
import SidebarContent from './SidebarContent'
import MobileNav from './MobileNav'
import ProfesionalManagement from '../UsersManagement/ProfesionalManagement'
import ClientManagement from '../UsersManagement/ClientManagement'
import PostManagement from '../UsersManagement/PostManagement'

export default function Sidebar () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { pathname } = useLocation()

  const bgColor = useColorModeValue('gray.100', 'gray.900')
  const bgElement = useColorModeValue('white', 'gray.800')

  return (
    <Box // contenedor principal
      minH='100vh'
      bg={bgColor}
    >
      <SidebarContent
        bg={bgElement}
        onClose={() => onClose}
        display={{
          base: 'none',
          md: 'none',
          lg: 'block'
        }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        display={{
          base: 'flex',
          md: 'flex',
          lg: 'none'
        }}
        onOpen={onOpen}
      />
      <Box
        ml={{
          base: 0,
          md: 0,
          lg: 60
        }}
        p='4'
      >
        {
        (pathname === '/dashboardAdmin/manageProfesional')
          ? <ProfesionalManagement />
          : (pathname === '/dashboardAdmin/manageClient')
              ? <ClientManagement />
              : (pathname === '/dashboardAdmin/managePost')
                  ? <PostManagement />
                  : null
      }
      </Box>
    </Box>
  )
}
