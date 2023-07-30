import { Icon } from '@chakra-ui/icon'
import { Flex, Link } from '@chakra-ui/layout'
import { useNavigate } from 'react-router'

/* eslint-disable react/prop-types */
export default function NavItem ({ icon, children, linkRoute, ...rest }) {
  const navigate = useNavigate()
  return (
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        onClick={() => navigate(linkRoute)}
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'cyan.400',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}
