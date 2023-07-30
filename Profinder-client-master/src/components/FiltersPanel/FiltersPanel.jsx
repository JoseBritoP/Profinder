/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, getAllSuppliers } from '../../services/redux/actions/actions'
import SelectCategories from '../../singleComponents/SelectCategories'
import FilterByRating from '../Filteres/FilterByRating'
import FilterByGenres from '../Filteres/FilterByGenres'

export default function FiltersPanel ({ setCurrentPage }) {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.filters)
  const categorySelected = filters.category || ''

  const ocupationSelected = filters.ocupation || ''
  const ratingSelected = filters.rating || ''
  const genreSelected = filters.genre || ''

  const bgElement = useColorModeValue('white', 'gray.800')
  const txtColor = useColorModeValue('gray.600', 'gray.100')

  function handleSelectCategory (value) {
    dispatch(applyFilters({ filter: 'category', value }))
    dispatch(applyFilters({ filter: 'ocupation', value: '' }))
    dispatch(getAllSuppliers())
    setCurrentPage(1)
  }

  function handleSelectOcupation (value) {
    dispatch(applyFilters({ filter: 'ocupation', value }))
    dispatch(getAllSuppliers())
    setCurrentPage(1)
  }

  return (
    <Box
      bg={bgElement}
      color={txtColor}
      pt={7}
      mt='-50px'
    >
      <Heading
        fontSize='4xl'
        bgGradient='linear(to-l, teal.300, green.400)'
        bgClip='text'
      >
        PROFESIONALES
      </Heading>
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
        <SelectCategories
          fnSelectCategory={handleSelectCategory}
          fnSelectOcupation={handleSelectOcupation}
          setCurrentPage={setCurrentPage}
        />
        <FilterByRating setCurrentPage={setCurrentPage} />
        <FilterByGenres setCurrentPage={setCurrentPage} />
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
            {`Resultados para
            ${categorySelected === 'Categorias' || categorySelected === 'Todas' ? '' : categorySelected + ' 🔹'} 
            ${ocupationSelected === 'Ocupacion' || ocupationSelected === '' || ocupationSelected === 'Selecciona una categoria' ? '' : ocupationSelected + ' 🔹'}
            ${ratingSelected === 'Rating' || ratingSelected === 'Aleatorio' ? '' : ratingSelected + ' 🔹'}
            ${genreSelected === 'Genero' || genreSelected === 'todos' ? '' : genreSelected}`}
          </Text>
        </Container>
      </Box>
    </Box>
  )
}
