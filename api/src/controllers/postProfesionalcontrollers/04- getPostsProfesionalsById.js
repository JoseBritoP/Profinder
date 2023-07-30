const { PostProfesional } = require('../../db');

const getPostProfesionalById = async (id) => {
  if (!id) throw Error(`El id es obligatorio`);

  const postProfesional = await PostProfesional.findByPk(id);

  // Verificar si el post existe y si la propiedad softDelete es falsa (o no existe)
  if (!postProfesional || (postProfesional.softDelete && postProfesional.softDelete === true)) {
    throw Error(`No existe el post de id: ${id}`);
  }

  return postProfesional;
};

module.exports = getPostProfesionalById;
