import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Container, Stack, Text } from '@chakra-ui/layout'
import { useClientDash } from '../../../../services/zustand/useClientDash'
import { CLIENT } from '../../constants'
import DropdownMenu from '../../../../singleComponents/DropdownMenu'

export default function FiltersDashboard () {
  const bgElement = useColorModeValue('white', 'gray.800')
  const txtColor = useColorModeValue('gray.600', 'gray.100')

  const {
    status,
    results
  } = useClientDash(state => state.filters)
  const {
    getClients,
    applyFilter
  } = useClientDash(state => state)

  const statusItems = [
    { name: 'Todos' },
    { name: 'Activo' },
    { name: 'Baneado' }
  ]

  function handleSelectStatus (event) {
    const { name } = event.target
    applyFilter({ name: 'status', value: name })
    name === 'Activo'
      ? getClients(CLIENT.GET_CLIENTS)
      : (name === 'Baneado')
          ? getClients(CLIENT.GET_CLIENTS)
          : getClients(CLIENT.GET_CLIENTS)
  }

  return (
    <Box
      bg={bgElement}
      color={txtColor}
    >
      <Container
        as={Stack}
        maxW='6xl'
        py={4}
        spacing={4}
        justify='center'
        align='center'
        direction='row'
        wrap='wrap'
      >
        <DropdownMenu
          titleMenu={status}
          menuItems={statusItems}
          onClick={handleSelectStatus}
        />
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle='solid'
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW='6xl'
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'start', md: 'start', lg: 'start' }}
        >
          <Text>
            {`${results} resultados
            ${status === 'Estatus' || status === 'Todos' ? '' : status + ' 🔹'}`}
          </Text>
        </Container>
      </Box>
    </Box>
  )
}
