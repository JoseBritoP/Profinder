const { Router } = require('express');

// Handlers:

const { getOcupations, getOcupation, postOcupation, putOcupation,getProfesionals
} = require('../handlers/ocupationsHandlers');

// Middlewares en caso de usar:

const postValidate = require('../middlewares/ocupation/postValidate');

// Router:

const ocupationsRouter = Router();

// Enrutado:

ocupationsRouter.get('/',getOcupations);

ocupationsRouter.get('/:id',getOcupation);

ocupationsRouter.post('/',postValidate,postOcupation);

ocupationsRouter.put('/:id',putOcupation);



module.exports = ocupationsRouter;