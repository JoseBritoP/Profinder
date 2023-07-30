import { create } from 'zustand'
import { API } from '../../utils/API/constants'

export const usePostDash = create((set) => ({
  postsActive: [],
  postsDeleted: [],

  getPostsActive: async (status) => {
    const response = await fetchData(`${API.DBONLINE}/postProfesionalb/allpost?softDelete=false`)
    set({
      postsActive: response
    })
  },

  getPostsDeleted: async () => {
    const response = await fetchData(`${API.DBONLINE}/postProfesionalb/allpost?softDelete=true`)
    set({
      postsDeleted: response
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
  title: '',
  image: [],
  content: '',
  category: null,
  ocupation: null,
  softDelete: false,
  ProfesionalId: 3
}
