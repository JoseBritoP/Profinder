const { Location } = require('../../db');

const getLocation = async (id) => {
  const location = await Location.findByPk(id);
  if(!location) throw Error(`No existe la localidad de id: ${id}`);
  return location
};

module.exports = getLocation;