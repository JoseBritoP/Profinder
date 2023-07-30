const { Router } = require('express');

// Handlers:

const {getProfesionals
} = require('../handlers/ocupationspHandlers');



const ocupationspRouter = Router();

ocupationspRouter.get('/',getProfesionals);

module.exports = ocupationspRouter;