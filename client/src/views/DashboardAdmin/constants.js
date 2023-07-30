const DOMAIN = 'https://backprofinder-production.up.railway.app/profesional'
const DOMAIN_CLIENT = 'https://backprofinder-production.up.railway.app/client'

export const URL = Object.freeze({
  GET_PROFESIONAL: `${DOMAIN}`,
  GET_BANNED_PROFESIONAL: `${DOMAIN}/delete`,
  GET_ACTIVE_PROFESIONAL: `${DOMAIN}/noDelete`,
  GET_BASIC_PROFESIONAL: `${DOMAIN}/noPremiun`,
  GET_PREMIUM_PROFESIONAL: `${DOMAIN}/premiun`
})

export const CLIENT = Object.freeze({
  GET_CLIENTS: `${DOMAIN_CLIENT}/allClients/all`,
  GET_ACTIVE_CLIENTS: `${DOMAIN_CLIENT}`,
  GET_BANNED_CLIENTS: `${DOMAIN_CLIENT}/delete`
})

export const getActualDate = () => {
  const tiempoTranscurrido = Date.now()
  const hoy = new Date(tiempoTranscurrido)

  return hoy.toLocaleDateString()
}
