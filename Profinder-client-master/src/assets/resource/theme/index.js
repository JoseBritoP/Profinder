import { extendTheme } from '@chakra-ui/react'

// aca dejo un ejemplo de como utilizar estas "variables de colores"
//     <Box bg="brand.bg"> //box es el "div"
//      este es una prueba
//    </Box>

const colors = {
  brand: {
    primary: '#1dd6d5',
    cards: '#5418e6',
    bg: 'red'
  }
}

const Button = {
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: '5000px',
    _hover: {
      bg: 'brand.primary'
    }
  },

  variants: {
    outline: {
      _hover: {
        bg: 'brand.primary'
      }
    },
    cta: {
      textTransform: 'uppercase'
    }
  }
}

export const theme = extendTheme({ colors, components: { Button } })
