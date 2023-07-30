export const filterSuppliers = (suppliers, objFilters) => {
  const stateByCategory = filterCategory(suppliers, objFilters)
  const stateByOcupation = filterOcupation(stateByCategory, objFilters)
  const stateByRating = filterRating(stateByOcupation, objFilters)
  const stateByGenre = filterGenre(stateByRating, objFilters)
  return stateByGenre
}

export const filterOcupation = (suppliers, objFilters) => {
  const newState = new Set()
  const selectedOcupation = objFilters.ocupation
  if (selectedOcupation === '' || selectedOcupation === 'Selecciona una categoria' || selectedOcupation === 'Ocupacion') return suppliers
  suppliers.forEach((supplier) => {
    const card = supplier
    supplier.professions.forEach(({ ocupations }) => {
      ocupations.forEach(({ name }) => {
        if (objFilters.ocupation === name) newState.add(card)
      })
    })
  })
  return [...newState]
}

export const filterCategory = (suppliers, objFilters) => {
  const newState = []
  const selectedCategory = objFilters.category
  if (selectedCategory === '' || selectedCategory === 'Todas' || selectedCategory === 'Categorias') return suppliers
  suppliers.forEach(supplier => {
    const card = supplier
    supplier?.professions?.forEach(({ category }) => {
      if (category === objFilters.category) newState.push(card)
    })
  })
  return newState
}

export const filterRating = (suppliers, objFilters) => {
  const order = objFilters.rating
  if (order === 'Aleatorio' || order === 'Rating') return suppliers
  const newState = suppliers.sort((a, b) => {
    if (order === 'Menor valoracion') {
      return a.rating - b.rating
    } else if (order === 'Mejor valoracion') {
      return b.rating - a.rating
    }
    return 0
  })

  return newState
}

export const filterGenre = (suppliers, objFilters) => {
  const selectedGenre = objFilters.genre
  if (selectedGenre === 'todos' || selectedGenre === 'Genero') return suppliers
  const newState = suppliers.filter(({ genre }) => {
    return genre === selectedGenre
  })
  return newState
}
