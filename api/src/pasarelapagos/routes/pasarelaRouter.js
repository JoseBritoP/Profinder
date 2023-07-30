const { Router } = require('express');

// Handlers:

const pasarelaHandler = require('../handler/pasarelaHandler');

// Middlewares en caso de usar:

// Router

const pasarelaRouter = Router();

// Enrutado:

pasarelaRouter.post('/',pasarelaHandler);


module.exports = pasarelaRouter;