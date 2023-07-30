import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, getAllSuppliers } from '../../services/redux/actions/actions'
import DropdownMenu from '../../singleComponents/DropdownMenu'

const FilterByGenres = ({setCurrentPage}) => {
  const filters = useSelector(state => state.filters)
  const [genreSelected, setGenreSelected] = useState(filters.genre)
  const dispatch = useDispatch()
  const genreOptions = [
    { name: 'Todos' },
    { name: 'Male' },
    { name: 'Female' }
  ]

  const handlerByGenres = (event) => {
    const { name } = event.target
    setGenreSelected(name)
    dispatch(applyFilters({ filter: 'genre', value: name.toLowerCase() }))
    dispatch(getAllSuppliers())
    setCurrentPage(1)
  }

  return (
    <DropdownMenu
      titleMenu={genreSelected}
      menuItems={genreOptions}
      onClick={handlerByGenres}
    />
  )
}

export default FilterByGenres
