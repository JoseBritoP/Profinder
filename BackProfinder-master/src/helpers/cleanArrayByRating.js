const cleanArrayProfesionalByRating = (profesionals) => {
    return profesionals.map((profesional) => {

        return {
            id: profesional.id,
            name: profesional.name,
            email: profesional.email.toLowerCase(),
            softDelete: profesional.softDelete,
            active: profesional.active,
            image: profesional.image,
            rating: profesional.rating,
            genre: profesional.genre,
            years_exp: profesional.years_exp,
            phone: profesional.phone,
            reviews: profesional.Reviews
        };
    })
};

module.exports = cleanArrayProfesionalByRating;