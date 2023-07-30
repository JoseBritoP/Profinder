const { Router } = require('express');

// Handlers:

const { getAllCountries, postCountry,getCountryById} = require('../handlers/countryHandlers');


// Router

const countryRouter = Router();

// Enrutado:

countryRouter.get('/',getAllCountries);
countryRouter.get('/:id',getCountryById);
countryRouter.post('/',postCountry);

module.exports = countryRouter;