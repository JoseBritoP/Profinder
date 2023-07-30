const axios = require('axios');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { Op } = require('sequelize');

const getAllCategoriesApi = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/categories.json');
    const apiData = response.data;

    // console.log(apiData);

    // Mapear los datos de la API en el formato esperado por el modelo de Sequelize
    const normalizedCategories = apiData.categorias.map(apiCategory => {
      const normalizedCategory = {
        name: apiCategory.nombre.trim().slice(0, 20),
      };

      return normalizedCategory;
    });

    // console.log(normalizedCategories);

    // Crear todos las categorías de una sola vez en la base de datos
    await Category.bulkCreate(normalizedCategories);

    //console.log('Base de datos llenada exitosamente.');
  } catch (error) {
    //console.error('Error al llenar la base de datos:', error.message);
    return (getAllCategories())
  }
};
const getAllCategories = () => {
  return axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/categories.json')
  .then((response)=>{
    const categories = response.data.categorias
    // console.log(categories.map((category)=>category.nombre))
    const categoriesMap = categories.map((category)=>({
      id: category.idcategoria,
      name: category.nombre
    }))    
    // console.log(categoriesMap)
    const promises = categoriesMap.map((category)=>{
      // console.log(category)
      return Category.findOrCreate({where:category})
    });

    return Promise.all(promises)
      .then(()=>{
        const allCategories = Category.findAll({include:{
          model: Ocupation,
          attributes: ['id','name'],
        }});
        // console.log(allCategories)
       // console.log("Base de datos llenada con las Categorías - API")
        return allCategories;
      })
  })
  .catch((error)=>{
    throw Error(error.message)
  });
};

const getCategoriesBdd = async () => {
  const categories = await Category.findAll({include:{
    model: Ocupation,
    attributes: ['id','name'],
  }});

  if(categories.length === 0){
    const allCategories = await getAllCategories();
    return allCategories;
  };
  //console.log("Devolviendo los datos en la base de datos");
  return categories
};

const getCategoriesByName = async (name) => {

  const query = name.toLowerCase().trim();
  const formattedQuery = `%${query}%`;

  const categoriesName = await Category.findAll({
    where: {
      name: {
        [Op.iLike]: formattedQuery,
      },
    },include:{
      model: Ocupation,
      attributes: ['id','name'],
    }
  });
  
  if(categoriesName.length === 0) throw Error (`No hay categorías llamadas: ${query}`);

  return categoriesName;
};

module.exports = {
  getAllCategories, getCategoriesByName,getAllCategoriesApi,getCategoriesBdd
};