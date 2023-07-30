/* eslint-disable react/prop-types */
import { Link } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useNavigate } from 'react-router'

export default function NavLink ({ textLink, routeLink }) {
  const navigate = useNavigate()
  return (
    <Link
      px={2}
      py={1}
      rounded='md'
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('blue.500', 'gray.700'),
        color: 'gray.200'
      }}
      onClick={() => navigate(routeLink)}
    >
      {textLink}
    </Link>
  )
}
