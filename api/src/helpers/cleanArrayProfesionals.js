const {Country,Location} = require('../db');

const cleanArray = async (profesionals) => {
  console.log(profesionals);
  const professionsWithLocation = await Promise.all(
    profesionals.map(async (profesional) => {
      const country = await Country.findByPk(profesional.CountryId);
      const location = await Location.findByPk(profesional.LocationId);
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
        active:profesional.active,
        image: profesional.image,
        rating: profesional.rating,
        genre: profesional.genre,
        years_exp: profesional.years_exp,
        phone: profesional.phone,
        lan:profesional.lat,
        lon:profesional.lon,  
        ubication: {
          country: country ? country.name : null,
          location: location ? location.name : null,
        },
        professions: professions,
        posts: profesional.PostProfesionals,
        reviews: profesional.Reviews
      };
    })
  );

  return professionsWithLocation;
};

module.exports = cleanArray;
