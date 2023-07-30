const { Profesional } = require('../../db');




const getAllProfesionalsDelete = async () => {
   
    let profesionals = await Profesional.findAll()

    return profesionals}



module.exports = {getAllProfesionalsDelete };
