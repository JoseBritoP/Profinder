const sequelize = require('sequelize');
const { Profesional, Client } = require('../db');
const { getClients, getAllClientsApi, createClient, updateClient, getClientById, logicDeleteClient,reverseDeleteClient, getClientByName, getAllClients,getClientsBaneados} = require("../controllers/clientController/index")

const getAllClientsHandler = async (req, res) => {
  const { name } = req.query
  try {
    let clients = name? await getClientByName(name) :await Client.findAll();
    // if (name) {
    //   clients = 
    // }

    if (!clients || clients.length === 0) {
      // No hay clientes en la base de datos, llamar a la función para obtener los clientes de la API y llenar la base de datos
      await getAllClientsApi();

    }


    return res.status(200).json(clients);
  } catch (error) {
    // console.log(error);
    return res.status(404).json({ error: error.message });
  }
};


const getClientsHandler = async (req, res) => {
  console.log(Client.findAll({where : {
    
  }}));
  const { name } = req.query
  try {
    let clients = await getClients();
    if (name) {
      clients = await getClientByName(name)
    }

    if (!clients || clients.length === 0) {
      // No hay clientes en la base de datos, llamar a la función para obtener los clientes de la API y llenar la base de datos
      await getAllClientsApi();

      // Obtener los clientes actualizados
      clients = await getClients();
    }


    return res.status(200).json(clients);
  } catch (error) {
    // console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

const getClientsBaneadosHandler= async (req, res) => {
  
  try {
    let clients = await getClientsBaneados();
   
    if (!clients || clients.length === 0) {
      // No hay clientes en la base de datos, llamar a la función para obtener los clientes de la API y llenar la base de datos
          return res.status(200).json({message: "Actualmente no hay clientes baneados"});
     
    }
    else {return res.status(200).json(clients)};
  } catch (error) {
    // console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

const getClientByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const clientFound = await getClientById(id)
    // Lógica para obtener un usuario por su ID

    res.status(200).json({ clientFound });
  } catch (error) {
    // console.error(error);
    res.status(404).json({ error: error.message });
  }
};



const createUserClient = async (req, res) => {
  const { name, email, password, image, genre, phone, CountryId, LocationId } = req.body
  try {

    const clientCreated = await createClient(name, email, password, image, genre, phone, CountryId, LocationId)

    //constante donde guardo lo que retorna el controller createClient y envio la respuesta

    return res.status(201).json(clientCreated);
  } catch (error) {
    //En caso de que falten datos, se envia la respuesta con un mensaje de error
    // console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
const putClient = async (req, res) => {
  const { id } = req.params;
  //console.log(id)
  const { name, email, password, image, genre, description, phone, CountryId, LocationId } = req.body;
  //console.log(name, email, password, image, genre, description, phone, CountryId, LocationId);
  //Guardamos la info de req.body en un objeto, para trabajar mas organizado cuando la funcion reciba el id y el mismo objeto.
  const clientInfo = { name, email, password, image, genre, description, phone }
  try {
    const updatedClient = await updateClient(id, name, email, password, image, genre, description, phone, CountryId, LocationId)


    return res.status(200).json(updatedClient);
  } catch (error) {
    return res.status(400).json({ error: error.message});
  }
};

const logicDeleteHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const dbProf = await logicDeleteClient(id);

    if (dbProf.length === 0) { res.send("El cliente no ha sido encontrado") }
    else res.status(200).json(dbProf)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const  reverseDeleteHandler= async (req, res) => {
  const { id } = req.params;
  try {
    const dbClient = await reverseDeleteClient(id);

    if (dbClient .length === 0) { res.send("El cliente no ha sido encontrado") }
    else res.status(200).json(dbClient)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getClientsHandler,
  getClientByIdHandler,
  putClient,
  createUserClient,
  logicDeleteHandler,
  getAllClientsHandler,
  reverseDeleteHandler,
  getClientsBaneadosHandler
};
