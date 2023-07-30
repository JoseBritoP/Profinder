//Controllers
const { getAllReviews, createReview, updateRatingProfesional } = require("../controllers/reviewsControllers/index")

//Handlers

const getAllReviewsHandler = async (req, res) => {
    try {
        
        const reviews = await getAllReviews();
        return res.status(200).json(reviews)
    } catch (error) {

        return res.status(404).json({ error: error.message });
    };
};


const createReviewHandler = async (req, res) => {
    const { content, clientId, rating, profesionalId } = req.body
    try {
        const post = await createReview(content, clientId, rating, profesionalId)
        return res.status(201).json(post)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

module.exports = {
    getAllReviewsHandler,
    createReviewHandler
}