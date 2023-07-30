import {
  filterCategory,
  filterOcupation
} from '../../../../services/redux/filters/reduxFilters'

export const filterData = (data, objFilters) => {
  const stateByCategory = filterCategory(data, objFilters)
  const stateByOcupation = filterOcupation(stateByCategory, objFilters)
  const stateByStatus = filterStatus(stateByOcupation, objFilters)
  const stateByPlan = filterPlan(stateByStatus, objFilters)

  return stateByPlan
}

export const filterStatus = (data, objFilters) => {
  let newState = []
  const filter = objFilters.status
  if (filter === 'Estatus' || filter === 'Todos') return data
  if (filter === 'Activo') {
    newState = data.filter(({ softDelete }) => {
      return (softDelete === false || softDelete === null)
    })
  } else {
    newState = data.filter(({ softDelete }) => {
      return softDelete === true
    })
  }

  return newState
}

export const filterPlan = (data, objFilters) => {
  let newState = []
  const filter = objFilters.plan
  if (filter === 'Plan' || filter === 'Todos') return data
  if (filter === 'Premium') {
    newState = data.filter(({ active }) => {
      return active === true
    })
  } else {
    newState = data.filter(({ active }) => {
      return active === false
    })
  }

  return newState
}
