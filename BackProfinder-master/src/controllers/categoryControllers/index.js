const { getAllCategories, getCategoriesByName,getAllCategoriesApi,getCategoriesBdd } = require('./01 - getCategories');
const getCategoryById = require('./02 - getCategoriesById');
const createCategory = require('./03 - createCategory');
const createCateProf = require('./04 - createCateProf');


module.exports = {
  getAllCategories,getCategoriesByName,
  getCategoryById,getAllCategoriesApi,getCategoriesBdd,
  createCategory,createCateProf
}