// Controllers:

const {getAllCategories, getCategoriesBdd, getCategoriesByName ,getCategoryById,createCategory,createCateProf} = require('../controllers/categoryControllers/index');

// Handlers:

const getCategories = async (req, res) => {
  const { name } = req.query;
  try {
    const categories = name ? await getCategoriesByName(name) : await getCategoriesBdd()
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getCategory = async (req,res) => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(404).json({error: error.message})
  }
};

const putCategory = (req,res) => {
  const { id } = req.params;
  return res.status(200).json({DIY: `En esta ruta se actualizará la información de la categoría de id: ${id}`})
};

const postCategory = async (req,res) => {
  const { name } = req.body;
  try {
    const newCategory = await createCategory(name);
    return res.status(201).json({categoryCreated: newCategory});
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

const postCateInProfes= async (req,res)=>{
  try {
    const {profesionalId,categoryId}= req.body;
    const newProfWithCategory= await createCateProf(profesionalId,categoryId);
    res.status(201).json(newProfWithCategory)
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = {
  getCategories, getCategory, putCategory, postCategory,postCateInProfes
}