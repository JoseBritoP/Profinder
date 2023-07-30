const { Category } = require('../../db');
const { Ocupation } = require('../../db');

const getCategoryById = async (id) => {

  const category = await Category.findByPk(id,{include:{
    model: Ocupation,
    attributes: ['id','name'],
  }});

  if(!category) throw Error (`No existe una categoría de id: ${id}`);

  return category;
};

module.exports = getCategoryById;