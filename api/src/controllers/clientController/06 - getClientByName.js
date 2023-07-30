const { Client } = require("../../db.js");
const cleanArrayClient = require("../../helpers/cleanArrayClient.js")
const { Op } = require("sequelize")

const getClientsByName = async (name) => {
    console.log(name);
    const query = name.toLowerCase().trim();
    const formattedQuery = `%${name}%`

    const clientByName = await Client.findAll({
        where: {
            name: {
                [Op.iLike]: formattedQuery,
            }
        },
    });
    if (clientByName.length === 0) throw Error(`No hay clientes llamados ${query}`);

    const formattedClients = cleanArrayClient(clientByName);

    return formattedClients;
};

module.exports = getClientsByName;