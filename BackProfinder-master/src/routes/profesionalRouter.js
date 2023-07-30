const { Router } = require('express');

// Handlers: 

const {createUserProfesional,logicDelete, getProfesionals,getProfesional,putProfesional,getProfesionalsDelete,getProfesionalsNotDelete,getProfesionalsPremiun,getProfesionalsNotPremiun, bePremiun,reverseDelete, notBePremiun} = require ('../handlers/profesionalHandlers')

// Middleware: 

const postValidate = require('../middlewares/profesional/postValidate');
const putValidate = require('../middlewares/profesional/putValidate');

// Router:

const profesionalRouter = Router();

// Enrutado:

profesionalRouter.get('/', getProfesionals);

profesionalRouter.get('/delete', getProfesionalsDelete);

profesionalRouter.get('/noDelete', getProfesionalsNotDelete);

profesionalRouter.get('/premiun', getProfesionalsPremiun);

profesionalRouter.get('/nopremiun', getProfesionalsNotPremiun);

profesionalRouter.get('/:id', getProfesional);

profesionalRouter.post('/', postValidate,createUserProfesional);

profesionalRouter.put('/delete/:id', logicDelete);

profesionalRouter.put('/reverseDelete/:id', reverseDelete);

profesionalRouter.put('/premiun/:id', bePremiun);

profesionalRouter.put('/reversePremiun/:id', notBePremiun);

profesionalRouter.put('/:id',putValidate,putProfesional);

module.exports = profesionalRouter;