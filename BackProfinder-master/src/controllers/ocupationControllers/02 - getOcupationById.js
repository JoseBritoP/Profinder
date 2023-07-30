const { Ocupation } = require('../../db');

const getOcupationById = async (id) => {

  const ocupation = await Ocupation.findByPk(id);

  if(!ocupation) throw Error (`No existe una ocupación de id: ${id}`);

  return ocupation;
};

module.exports = getOcupationById;