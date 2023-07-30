const { Router } = require('express');

const { userRegister}=require('../handlers/registerHandler');

const postValidate = require('../middlewares/users/postValidate');

const registerRouter = Router();


registerRouter.post('/', postValidate, userRegister)



module.exports = registerRouter;