const { Review, Profesional } = require("../../db")

const ratingProfesionalAverage = async (reviews) => {


    const accumulation = await reviews.reduce((acc, value) => {
        return acc + value.dataValues.rating
    }, 0);
    const quanty = reviews.reduce((acc, value) => {
        if (value.dataValues.hasOwnProperty("rating")) {
            return acc + 1
        }
        else {
            return acc
        }
    }, 0
    );
    let total = accumulation / quanty
    return Math.round(total).toString()



};

module.exports = ratingProfesionalAverage;