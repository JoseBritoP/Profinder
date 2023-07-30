const { Router } = require('express');

// Handlers:

const {getAllLocations, postLocation,getLocationById} = require('../handlers/locationHandlers')

// Middleware

const postValidate = require('../middlewares/location/postValidate');

// Router

const locationRouter = Router();

// Enrutado:

locationRouter.get('/',getAllLocations);

locationRouter.get('/:id',getLocationById)

locationRouter.post('/',postValidate,postLocation);

module.exports = locationRouter;