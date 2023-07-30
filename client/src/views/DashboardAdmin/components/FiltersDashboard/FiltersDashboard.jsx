import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Container, Stack, Text } from '@chakra-ui/layout'
import { useProfesionalDash } from '../../../../services/zustand/useProfesionalDash'
import { URL } from '../../constants'
import SelectCategories from '../../../../singleComponents/SelectCategories'
import DropdownMenu from '../../../../singleComponents/DropdownMenu'

export default function FiltersDashboard () {
  const bgColor = useColorModeValue('white', 'gray.800')
  const txtColor = useColorModeValue('gray.600', 'gray.100')

  const {
    category,
    ocupation,
    status,
    plan,
    results
  } = useProfesionalDash(state => state.filters)
  const {
    applyFilter,
    getProfesional
  } = useProfesionalDash(state => state)

  const statusItems = [
    { name: 'Todos' },
    { name: 'Activo' },
    { name: 'Baneado' }
  ]

  const planItems = [
    { name: 'Todos' },
    { name: 'Basico' },
    { name: 'Premium' }
  ]

  function handleSelectCategory (value) {
    applyFilter({ name: 'category', value })
    applyFilter({ name: 'ocupation', value: '' })
    getProfesional(URL.GET_PROFESIONAL)
  }

  function handleSelectOcupation (value) {
    applyFilter({ name: 'ocupation', value })
    getProfesional(URL.GET_PROFESIONAL)
  }

  function handleSelectStatus (event) {
    const { name } = event.target
    applyFilter({ name: 'status', value: name })
    name === 'Activo'
      ? getProfesional(URL.GET_PROFESIONAL)
      : (name === 'Baneado')
          ? getProfesional(URL.GET_PROFESIONAL)
          : getProfesional(URL.GET_PROFESIONAL)
  }

  function handleSelectPlan (event) {
    const { name } = event.target
    applyFilter({ name: 'plan', value: name })
    name === 'Basico'
      ? getProfesional(URL.GET_PROFESIONAL)
      : (name === 'Premium')
          ? getProfesional(URL.GET_PROFESIONAL)
          : getProfesional(URL.GET_PROFESIONAL)
  }

  return (
    <Box
      bg={bgColor}
      color={useColorModeValue('gray.50', 'gray.200')}
      mb={{
        base: '-90px',
        md: '0px'
      }}
    >
      <Container
        as={Stack}
        maxW='6xl'
        width=''
        py={4}
        spacing={4}
        justify='center'
        align='center'
        direction='row'
        wrap='wrap'
      >
        <SelectCategories
          titleCategory={category}
          titleOcupation={ocupation}
          fnSelectCategory={handleSelectCategory}
          fnSelectOcupation={handleSelectOcupation}
        />
        <DropdownMenu
          titleMenu={status}
          menuItems={statusItems}
          onClick={handleSelectStatus}
        />
        <DropdownMenu
          titleMenu={plan}
          menuItems={planItems}
          onClick={handleSelectPlan}
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
          <Text
            color={txtColor}
          >
            {`${results} resultados
            ${category === 'Categorias' || category === 'Todas' ? '' : category + ' 🔹'} 
            ${ocupation === 'Ocupacion' || ocupation === '' ? '' : ocupation + ' 🔹'}
            ${status === 'Estatus' || status === 'Todos' ? '' : status + ' 🔹'}
            ${plan === 'Plan' || plan === 'Todos' ? '' : plan + ' 🔹'}`}
          </Text>
        </Container>
      </Box>
    </Box>
  )
}
