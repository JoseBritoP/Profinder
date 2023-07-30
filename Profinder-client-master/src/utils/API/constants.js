export const API = Object.freeze({
  DBONLINE: 'https://backprofinder-production.up.railway.app',
  JSON: 'https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/db.json',
  LOCALHOST: 'http://localhost:3001'
})

export const LOCAL = Object.freeze({
  register: 'src/utils/endpointsGET/GET-register.json',
  pofesional: 'src/utils/endpointsGET/GET-all-profesional.json',
  profesionalID: 'src/utils/endpointsGET/GET-profesional-ID.json',
  profesionalName: 'src/utils/endpointsGET/GET-profesional-name.json',
  profesionalOcupation: 'src/utils/endpointsGET/GET-profesional-ocupation.json',
  category: 'src/utils/endpointsGET/GET-categories.json',
  ocupations: 'src/utils/endpointsGET/GET-ocupations.json',
  client: 'src/utils/endpointsGET/GET-clients.json',
  postProfesional: 'src/utils/endpointsGET/GET-postProfesional.json',
  postClient: 'src/utils/endpointsGET/GET-postClient.json',
  profesionalImages: 'src/utils/endpointsGET/GET-profesional-images.json'
})
