const { Client, Review } = require("../../db.js")
const axios = require('axios');
const cleanArrayClient = require('../../helpers/cleanArrayClient.js')

const getAllClientsApi = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/clients.json');
    const apiData = response.data;

    // console.log(apiData);

    // Mapear los datos de la API en el formato esperado por el modelo de Sequelize
    const normalizedClients = apiData.clients.map(apiClient => {
      const normalizedClient = {
        name: apiClient.name ? apiClient.name.trim().slice(0, 40) : '',
        email: apiClient.email ? apiClient.email.trim() : '',
        password: apiClient.password,
        phone: apiClient.phone ? apiClient.phone.replace(/\D/g, "").slice(0, 10) : '',
        image: apiClient.image ? apiClient.image.trim() : '',
        genre: apiClient.genre ? apiClient.genre.trim() : '',
        rating: apiClient.rating && !isNaN(apiClient.rating) ? Math.min(parseFloat(apiClient.rating), 5) : null,
        description: apiClient.description ? apiClient.description.trim().slice(0, 120) : '',
        ubication: apiClient.ubicacion ? apiClient.ubicacion.trim().slice(0, 50) : '',
        pro: false,
        active: false,
      };

      return normalizedClient;
    });

    // console.log(normalizedClients);

    // Crear todos los clientes de una sola vez en la base de datos
    await Client.bulkCreate(normalizedClients);
    console.log('Base de datos llenada exitosamente con los clientes.');
  } catch (error) {
    console.error('Error al llenar la base de datos:', error.message);
  }
};

const getAllClients= async () => {
  const clients = await Client.findAll({
    
    include: {
      model: Review,
      attributes: ["content"],
    }
  });

  if (!clients) throw Error(`No hay clientes a mostrar`);
  const cleanArray = await cleanArrayClient(clients);
  return cleanArray
};

module.exports = {
getAllClients,
  getAllClientsApi,
}