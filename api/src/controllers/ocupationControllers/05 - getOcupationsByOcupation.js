const { Ocupation } = require('../../db');
const { Op } = require('sequelize');
const { Profesional } = require('../../db');
const { Category } = require('../../db');
const cleanArray = require('../../helpers/cleanArrayProfesionals')

const getOcupationsByOcupation= async (name)=>{
  // const query = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  const query = name.toLowerCase();
  // console.log(query)
  const ocupacionsName = await Ocupation.findAll({
    where:{
      name:{
        [Op.iLike] :`%${query}%`
      },
    },
  });

  if(ocupacionsName.length === 0) throw Error (`No hay profesionales con ocupaciones llamadas: ${name}`);

  if(ocupacionsName.length !== 0) { 
    const profesionals = await Profesional.findAll({
      include: [
        {
          model: Category,
          attributes: ["id","name"],
          through: { attributes: [] }
        },
        {
          model: Ocupation,
          attributes: ["id","name","CategoryId"],
          through: { attributes: [] }
        }
      ]
    });

    const profesionalsWithThisOcupation= []

    for (let i=0; i<profesionals.length;i++){
      const ocupaciones=profesionals[i].Ocupations

      for (let j=0; j<ocupaciones.length;j++){
          
        if(ocupaciones[j].name.toLowerCase()===name.toLowerCase()|| (ocupaciones[j].name.toLowerCase().includes(name.toLowerCase())|| (ocupaciones[j].name.toLowerCase().includes(name.toLowerCase())))){
          profesionalsWithThisOcupation.push(profesionals[i])
        };
      };
    };
    const cleandProfesionals = cleanArray(profesionalsWithThisOcupation);
    if(cleandProfesionals.length === 0) throw Error(`No hay profesionales con la ocupación: ${name}`)
    return cleandProfesionals
  }
}

module.exports= getOcupationsByOcupation;