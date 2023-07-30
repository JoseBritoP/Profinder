const { Profesional, Client,Category,Ocupation,Country,Location } = require('../../db');
const cleanArrayProfesionalFavorites = require('../../helpers/cleanArrayProfesionalsFavorites');
const getContactById = async (id) => {
  const client = await Client.findByPk(id,{
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

  // if(client.Profesionals.length === 0) throw Error(`No se encontró relación entre el cliente de id ${id} con profesionales`);
  const cleanInfo = cleanArrayProfesionalFavorites(client.Profesionals);
  return cleanInfo
  return {
    id: client.id,
    name: client.name,
    email: client.email,
    phone:client.phone,
    profesionals: cleanInfo
  }
};

module.exports = getContactById;