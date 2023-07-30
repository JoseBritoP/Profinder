
const cleanProfesional = (profesional) => {

  const professions = profesional.Categories.map((category) => {
    const ocupations = profesional.Ocupations.filter(
      (ocupation) => ocupation.CategoryId === category.id
    );
    return {
      id: category.id,
      category: category.name,
      ocupations: ocupations.map((ocupation) => ({
        id: ocupation.id,
        name: ocupation.name,
      })),
    };
  });

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
    ubication: {
      country: profesional.Country ? profesional.Country.dataValues.name : null,
      location: profesional.Location ? profesional.Location.dataValues.name : null,
    },
    professions: professions,
    jobimages: profesional.ProfesionalImagesPosts,
    posts: profesional.PostProfesionals,
    reviews: profesional.Reviews,
  };
};

module.exports = cleanProfesional;