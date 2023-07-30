const { Router } = require('express');
const { getAllReviewsHandler, createReviewHandler } = require('../handlers/reviewsHandlers');

// Middlewares

const postValidate = require('../middlewares/reviews/postValidate')

//Router
const reviewRouter = Router();

//Enrutado
reviewRouter.get("/", getAllReviewsHandler)
reviewRouter.post("/", postValidate, createReviewHandler)

module.exports = reviewRouter