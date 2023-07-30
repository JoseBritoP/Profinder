import { create } from 'zustand'
import { API } from '../../utils/API/constants'
import {
  filterData,
  filterStatus,
  filterPlan
} from '../../views/DashboardAdmin/components/FiltersDashboard/filters'

export const useProfesionalDash = create((set) => ({
  profesional: [],
  auxProfesional: [],
  messageBackend: '',
  countsGraphic: {
    profesional: 0,
    profesionalActive: 0,
    profesionalBanned: 0,
    profesionalPremiumActive: 0,
    profesionalPremiumBanned: 0
  },
  filters: {
    category: 'Categorias',
    ocupation: 'Ocupacion',
    status: 'Estatus',
    plan: 'Plan',
    results: 0
  },

  applyFilter: (filter) => {
    set((state) => ({
      filters: { ...state.filters, [filter.name]: filter.value }
    }))
  },

  countResults: (totalResults) => {
    set((state) => ({
      filters: { ...state.filters, results: totalResults }
    }))
  },

  getCountsGraphic: () => {
    set((state) => ({
      countsGraphic: getCounts(state.countsGraphic, state.auxProfesional)
    }))
  },

  getProfesional: async (URL) => {
    const response = await fetchData(URL)
    set((state) => ({
      profesional: response.message ? noResultsObject : filterData(response, state.filters),
      auxProfesional: response
    }))
  },

  postBannedProfesional: async (userID) => {
    const options = { method: 'PUT' }
    const response = await fetchData(`${API.DBONLINE}/profesional/delete/${userID}`, options)
    set({
      messageBackend: response
    })
  },

  postUnbannedProfesional: async (userID) => {
    const options = { method: 'PUT' }
    const response = await fetchData(`${API.DBONLINE}/profesional/reverseDelete/${userID}`, options)
    set({
      messageBackend: response
    })
  },

  postPremiumProfesional: async (userID) => {
    const options = { method: 'PUT' }
    const response = await fetchData(`${API.DBONLINE}/profesional/premiun/${userID}`, options)
    set({
      messageBackend: response
    })
  },

  postRemovePremium: async (userID) => {
    const options = { method: 'PUT' }
    const response = await fetchData(`${API.DBONLINE}/profesional/reversePremiun/${userID}`, options)
    set({
      messageBackend: response
    })
  }

}))

const fetchData = async (URL, options) => {
  const data = await fetch(URL, options)
    .then(response => response.json())
    .then(results => {
      if (results.message) {
        return [noResultsObject]
      }
      return results
    })
    .catch(error => console.error(error))
  return data
}

const noResultsObject = {
  id: 1,
  name: 'Ningun',
  email: 'Resultado',
  image: undefined,
  active: undefined,
  softDelete: undefined,
  noResults: true
}

const getCounts = (countsGraphic, data) => {
  countsGraphic.profesional = data.length
  countsGraphic.profesionalActive = filterStatus(data, { status: 'Activo' }).length
  countsGraphic.profesionalBanned = filterStatus(data, { status: 'Baneado' }).length
  countsGraphic.profesionalPremium = filterPlan(data, { plan: 'Premium' }).length
  countsGraphic.profesionalPremiumActive = filterData(data, {
    category: 'Categorias',
    ocupation: 'Ocupacion',
    status: 'Activo',
    plan: 'Premium'
  }).length
  countsGraphic.profesionalPremiumBanned = filterData(data, {
    category: 'Categorias',
    ocupation: 'Ocupacion',
    status: 'Beneado',
    plan: 'Premium'
  }).length

  return countsGraphic
}
