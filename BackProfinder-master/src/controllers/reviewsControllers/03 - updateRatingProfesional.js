const { Profesional, Review } = require("../../db")
const cleanArrayProfesionalByRating = require("../../helpers/cleanArrayByRating")


const updateRatingProfesional = async (id) => {
    const profesional = await Profesional.findAll({
        where: {
            id
        }
        ,
        include: [
            {
                model: Review,
                attributes: ["content", "rating"],
            }
        ]
    })
    const editProfesional = cleanArrayProfesionalByRating(profesional)
    return editProfesional[0].reviews

    
};

module.exports = updateRatingProfesional