// const { Post } = require("../../db.js")
// const axios = require('axios');
const { Review } = require('../../db');
const data = require('../../data/reviews.json');
const updateRatingProfesional = require("./03 - updateRatingProfesional.js")
const ratingProfesionalAverage = require("../profesionalControllers/07 - ratingProfesional.js")
const createReview = require("./02 - createReview");

const getAllReviews = async () => {

    const reviewsData = data.map((review) => {

        return createReview(review.content, null, review.rating, review.profesionalId)

    });

    return Promise.all(reviewsData)
        .then(() => {
            const reviews = Review.findAll();
            return reviews;
        })
        .catch((error) => {
            throw Error(error.message);
        });
};

module.exports = getAllReviews;