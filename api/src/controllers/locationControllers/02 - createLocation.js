const { Location } = require('../../db');

const createLocation = async (name,countryId) => {

  const nameLocationFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const newLocation = await Location.create({name:nameLocationFormat});
  await newLocation.setCountry(countryId);

  if(!newLocation) throw Error(`No se pudo crear la localidad llamada: ${nameLocationFormat}`);
  return newLocation;
};

module.exports = createLocation;