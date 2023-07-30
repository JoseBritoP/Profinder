const { Review, Profesional } = require("../../db.js")
const updateRatingProfesional = require("./03 - updateRatingProfesional.js")
const ratingProfesionalAverage = require("../profesionalControllers/07 - ratingProfesional.js")

const createReview = async (content, clientId, rating, profesionalId) => {

    const newReview = await Review.create({ content, rating, });
    if (clientId) {
        await newReview.setClient(clientId);
    }
    await newReview.setProfesional(profesionalId)
    const arrayReviews = await updateRatingProfesional(profesionalId)
    const average = await ratingProfesionalAverage(arrayReviews)

    await Profesional.update(
        { rating: average },
        {
            where: { id: profesionalId },
        }
    );

    if (!newReview) throw Error(`No se pudo crear la opinion.`);
    return "Opinion creada con exíto.";
};

module.exports = createReview