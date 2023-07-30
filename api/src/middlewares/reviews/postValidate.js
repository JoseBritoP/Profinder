const reviews = require("../../controllers/reviewsControllers/03 - updateRatingProfesional")
const { Review } = require("../../db")

const validateContent = (content) => {
    if (!content) {
        throw Error("Por favor, agregue una descripción.")
    }
    const fourWords = content.split(" ");
    if (fourWords.length < 4) {
        throw Error("Debe ingresar 4 palabras")
    }
}

const validateRating = (rating) => {
    if (!rating) {
        throw Error("Por favor, debe agregarle valoracion al profesional.")
    }
    if (rating > 5) {
        throw Error("Las valoraciónes son de 1 a 5.")
    }
};

const validateSelectProfesional = (ProfesionalId) => {
    if (!ProfesionalId) {
        throw Error("Debe ingresar al profesional que se le desea dar la valoración.")
    }
}

const validateReviewsCount = async (clientId, profesionalId) => {
    let count = await Review.count({
        where: {
            ClientId: clientId,
            ProfesionalId: profesionalId
        }
    })
    if (count === 15) {
        throw Error("El maximo de opiniones hacia un profesional es de 15")
    }
}



module.exports = async (req, res, next) => {
    const { content, clientId, rating, profesionalId } = req.body;
    try {
        validateContent(content)
        validateRating(rating)
        validateSelectProfesional(profesionalId)
        await validateReviewsCount(clientId, profesionalId)
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};