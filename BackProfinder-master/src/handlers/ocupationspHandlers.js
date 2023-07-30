const { Ocupation } = require('../db');
const { Op } = require('sequelize');


const {getOcupationsByOcupation, getMessage}= require('../controllers/ocupationControllers/index')


const getProfesionals=async (req,res)=>{
    const { name } = req.query;
  try {
    const profesionals = name ? await getOcupationsByOcupation(name) : await getMessage();
    return res.status(200).json(profesionals);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
}


module.exports= {getProfesionals};