const { Router } = require('express');
const { getAllPostsHandler } = require('../handlers/postProfesionalHandlers');

// Middleware

const postValidate = require('../middlewares/postProfresional/postValidate');


//Router
const postProfesionalbRouter = Router();


postProfesionalbRouter.get("/allpost", getAllPostsHandler)

module.exports = postProfesionalbRouter