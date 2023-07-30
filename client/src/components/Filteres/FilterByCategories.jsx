import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../services/redux/actions/actions'
import { Select, Box, Text } from '@chakra-ui/react'

const FilterByCategoria = ({setCurrentPage}) => {
  const categories = useSelector((state) => state.categories)
  // console.log( categories);
  const filteredCategories = useSelector((state) => state.filteredCategories)
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProfession, setSelectedProfession] = useState('')
  const [filteredProfessions, setFilteredProfessions] = useState([])

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const handleCategoryChange = (event) => {
    const category = event.target.value
    console.log(category)
    setSelectedCategory(category)
    const selectedCategoryObj = categories.find((cat) => cat.nombre === category)
    setFilteredProfessions(selectedCategoryObj?.profesiones || [])
    setCurrentPage(1)
  }

  const handleProfessionChange = (event) => {
    setSelectedProfession(event.target.value)
    setCurrentPage(1)
  }

  const categoryNames = categories.map((category) => category.nombre)

  return (
    <Box>
      <Text fontSize='xl' fontWeight='bold' mb={4}>
        Categories:
      </Text>
      <Select value={selectedCategory} onChange={handleCategoryChange} placeholder='Select category'>
        {categoryNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </Select>
      {selectedCategory && (
        <>
          <Text mt={4} fontSize='xl' fontWeight='bold'>
            Professions:
          </Text>
          <Select value={selectedProfession} onChange={handleProfessionChange} placeholder='Select profession'>
            {filteredProfessions.map((profession, index) => (
              <option key={index} value={profession}>
                {profession}
              </option>
            ))}
          </Select>
        </>
      )}
      {filteredCategories.length > 0 && (
        <>
          <Text mt={4} fontSize='xl' fontWeight='bold'>
            Technologies:
          </Text>
          <ul>
            {filteredCategories.map((category) =>
              category.profesiones.map((profession, index) => (
                <li key={index}>{profession}</li>
              ))
            )}
          </ul>
        </>
      )}
    </Box>
  )
}

export default FilterByCategoria
