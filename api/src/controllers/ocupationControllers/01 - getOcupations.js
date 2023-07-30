const { Ocupation } = require('../../db');
const { Op } = require('sequelize');

const axios = require('axios');


const getAllOcupationApi = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/ocupation.json');
    const apiData = response.data;

    // console.log(apiData);

    // Mapear los datos de la API en el formato esperado por el modelo de Sequelize
    const normalizedOcupations = apiData.profesiones.map(apiOcupation => {
      const normalizedOcupation = {
        name: apiOcupation.nombre.trim().slice(0, 40),
        CategoryId: apiOcupation.idcategoria,
      };

      return normalizedOcupation;
    });

    // console.log(normalizedOcupations);

    // Crear todas las ocupaciones de una sola vez en la base de datos
    await Ocupation.bulkCreate(normalizedOcupations);

    //console.log('Base de datos llenada exitosamente con las ocupaciones.');
  } catch (error) {
    console.error('Error al llenar la base de datos:', error.message);
  }
};

const getAllOcupationsApi = () => {
  return axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/ocupation.json')
  .then((response)=>{
    const ocupations = response.data.profesiones

    const ocupationsMap = ocupations.map((ocupation)=>({
      name: ocupation.nombre,
      CategoryId: ocupation.idcategoria,
    }));

    const promises = ocupationsMap.map((ocupation)=>{
      return Ocupation.findOrCreate({where:ocupation});
    });

    return Promise.all(promises)
    .then(()=>{
      const ocupations = Ocupation.findAll();
      //console.log("Base de datos llenada con las ocupaciones - API")
      return ocupations
    });
  })
  .catch((error)=>{
    throw Error(error.message)
  })
};

const getOcupationsBdd = async () => {
  const ocupations = await Ocupation.findAll();

  if(ocupations.length === 0){
    const ocupations = await getAllOcupationsApi();
    return ocupations;
  };
  //console.log("Devolviendo los datos almacenados de Ocupations");
  return ocupations

};


const getAllOcupations = async () => {
  try {
    let ocupations = await Ocupation.findAll();

    if (!ocupations || ocupations.length === 0) {
      // La base de datos está vacía, llamar a la función para obtener las ocupaciones de la API y llenar la base de datos
      await getAllOcupationApi();

      // Obtener las ocupaciones actualizadas
      ocupations = await Ocupation.findAll();
    }

    return ocupations;
  } catch (error) {
    throw new Error('Error al obtener las ocupaciones: ' + error.message);
  }
};


const getOcupationsByName = async (name) => {

  const query = name.toLowerCase().trim();
  const formattedQuery = `%${query}%`

  const ocupacionsName = await Ocupation.findAll({
    where:{
      name:{
        [Op.iLike] : formattedQuery,
      },
    },
  });

  if(ocupacionsName.length === 0) throw Error (`No hay ocupaciones llamadas: ${query}`);

  return ocupacionsName;
};

module.exports = {
  getAllOcupations, getOcupationsByName,getAllOcupationApi,getAllOcupationsApi,getOcupationsBdd
};