const { Router } = require('express');

// Handlers:

const { getCategories, getCategory, putCategory, postCategory,postCateInProfes
} = require('../handlers/categoryHandlers');

// Middlewares en caso de usar:

const postValidate = require('../middlewares/category/postValidate');
const getValidateId = require('../middlewares/category/getValidateId');

// Router

const categoryRouter = Router();

// Enrutado:

categoryRouter.get('/',getCategories);

categoryRouter.get('/:id',getValidateId,getCategory);

categoryRouter.put('/:id',putCategory);

categoryRouter.post('/',postValidate,postCategory);

categoryRouter.post('/profesional', postCateInProfes);

module.exports = categoryRouter;