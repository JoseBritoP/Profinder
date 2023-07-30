const { Profesional, Client,Category,Ocupation,Country,Location } = require('../../db');
const cleanArrayProfesionalFavorites = require('../../helpers/cleanArrayProfesionalsFavorites');

const updateContact = async (id,profesionalId) => {
  const client = await Client.findByPk(id);
  if(!client) throw Error(`No existe el cliente de id ${id}`);

  const profesional = await Profesional.findByPk(profesionalId);
  if(!profesional) throw Error(`No existe el profesional de id ${profesionalId}`);

  await client.removeProfesional(profesional);

  const clientWithProfesionals = await Client.findByPk(id,{
    attributes: ["id", "name", "email", "phone"],
    include: {
      model: Profesional,
      attributes: ["id", "name", "email", "image","genre","rating","years_exp"],
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
        },
        { 
          model: Country, 
          attributes: ["id","name"],
        },
        { 
          model: Location, 
          attributes: ["id","name"],
        }
      ],
      through: { attributes: [] }
    },
  });
  const cleanInfo = cleanArrayProfesionalFavorites(clientWithProfesionals.Profesionals);
  return {
    profesionalId: profesionalId
  }
  return cleanInfo;
  return clientWithProfesionals;
};

module.exports = updateContact;