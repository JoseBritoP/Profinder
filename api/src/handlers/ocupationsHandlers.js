// Controllers:
const axios = require('axios');
const {getAllOcupations, getOcupationsByName, createOcupation,getOcupationsBdd, getOcupationById,updateOcupation, getProfesionalsByOcupation,getAllProfesionals} = require('../controllers/ocupationControllers/index');

// Handlers:

  const getOcupations = async (req,res) => {
  const { name } = req.query;
  try {
    const ocupations = name ? await getOcupationsByName(name) : await getAllOcupations();
    return res.status(200).json(ocupations);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const getOcupation = async (req,res) => {
  const { id } = req.params;
  try {
    const ocupation = await getOcupationById(id);
    return res.status(200).json(ocupation) 
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const postOcupation = async (req,res) => {
  const {name,categoryId} = req.body;
  try {
    const newOcupation = await createOcupation(name,categoryId);
    return res.status(201).json(newOcupation);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const putOcupation = async (req,res) => {
  const { id } = req.params;
  const { name , categoryId} = req.body;
  try {
    const updatedOcupation = await updateOcupation(id,name,categoryId);
    return res.status(200).json(updatedOcupation);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

module.exports = {
  getOcupations, getOcupation, postOcupation, putOcupation,
}