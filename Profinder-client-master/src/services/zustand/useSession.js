import { create } from 'zustand'
import { API } from '../../utils/API/constants'

export const useSessionState = create((set) => ({
  session: {
    id: 1,
    name: '',
    email: '',
    usuario: '',
    message: '',
    image: '',
    status: false
  },
  emptySession: {
    id: 1,
    name: '',
    email: '',
    usuario: '',
    message: '',
    image: '',
    status: false
  },
  userInfo: {},

  setSessionState: (session) => set(() => ({ session })),

  removeSessionState: () => set((state) => ({ session: state.emptySession })),

  getUserInfo: () => {
    set(async (state) => ({
      userInfo: await fetchData(`${API.DBONLINE}/profesional/${state.session.id}`)
    }))
  }
}))

const fetchData = async (URL, options) => {
  const data = await fetch(URL, options)
    .then(response => response.json())
    .then(results => {
      if (results.message) {
        return emptySession
      }
      return results[0]
    })
    .catch(error => console.error(error))
  console.info(data)
  return data
}

const emptySession = {
  id: 1,
  name: '',
  email: '',
  usuario: '',
  message: '',
  image: '',
  status: false
}
