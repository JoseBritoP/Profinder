const { Client, Review } = require("../../db.js");
const cleanArrayClientById = require("../../helpers/cleanArrayClientById.js");

const getClientById = async (id) => {
    const searchClient = await Client.findByPk(id, {
        include: {
            model: Review,
            attributes: ["content"]
        }
    })
    if(!searchClient) throw Error(`No existe un cliente de id: ${id}`);
  const cleanedInfo = cleanArrayClientById(searchClient);
  return cleanedInfo
    
};



module.exports = getClientById;
