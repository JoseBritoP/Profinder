const { Router } = require('express');


// Handlers
const { getClientsHandler, getClientByIdHandler, createUserClient, putClient, logicDeleteHandler ,getAllClientsHandler,reverseDeleteHandler,getClientsBaneadosHandler} = require('../handlers/clientHandlers');

//Midlewares 

const postValidate = require("../middlewares/clients/postValidate.js")
const putValidate = require("../middlewares/clients/putValidate.js")

//Router
const clientRouter = Router();

//Enrutado
clientRouter.get('/', getClientsHandler);
clientRouter.get('/:id', getClientByIdHandler);
clientRouter.post('/', postValidate, createUserClient);
clientRouter.put('/:id', putClient);
clientRouter.put('/delete/:id', logicDeleteHandler)
clientRouter.put('/reverseDelete/:id', reverseDeleteHandler)
clientRouter.get('/allClients/all', getAllClientsHandler)
clientRouter.get('/delete', getClientsBaneadosHandler);
module.exports = clientRouter;

