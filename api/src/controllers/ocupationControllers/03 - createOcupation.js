const { Ocupation } = require('../../db');

const createOcupation = async (name,categoryId) => {
  //console.log(name)

  const nameOcupationFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const newOcupation = await Ocupation.create({ name: nameOcupationFormat });
  await newOcupation.setCategory(categoryId);

  if(!newOcupation) throw Error (`No se pudo crear una ocupación`);
  return newOcupation;
};

module.exports = createOcupation;