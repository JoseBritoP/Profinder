const { Ocupation } = require('../../db');

const updateOcupation = async (id,name, categoryId) => {

  if(!id) throw Error(`El id es obligatorio para actualizar la ocupación`);
  if(!categoryId) throw Error(`el id de la categoría es obligatorio para asociarlo`);

  const ocupationToUpdate = await Ocupation.findByPk(id);

  if(!ocupationToUpdate) throw Error (`No se encontró la ocupación de id: ${id}`);

  const nameOcupationFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  ocupationToUpdate.name = nameOcupationFormat || ocupationToUpdate.name;
  ocupationToUpdate.categoryId = categoryId || ocupationToUpdate.categoryId;

  await ocupationToUpdate.save();

  const ocupationUpdated = {
    name : ocupationToUpdate.name,
    categoryId: ocupationToUpdate.categoryId
  }

  return ocupationUpdated;
};

module.exports = updateOcupation;