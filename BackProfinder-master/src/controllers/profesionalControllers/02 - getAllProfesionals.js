const { Profesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { Country } = require('../../db');
const { Location } = require('../../db');
const { PostProfesional } = require("../../db")
const { Review } = require("../../db")
const cleanArray = require('../../helpers/cleanArrayProfesionals');

const axios = require('axios');


const getAllProfesionalApi = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/profesionales.json');
    const apiData = response.data

    // Mapear los datos de la API en el formato esperado por el modelo de Sequelize
    const normalizedProfessionals = apiData.profesionales.map(apiProfessional => {
      const nameParts = apiProfessional.name ? apiProfessional.name.trim().split('.') : [];
      const name = nameParts.length > 1 ? nameParts.slice(1).join('.').trim() : apiProfessional.name.trim();

      const normalizedProfessional = {

        name: name.slice(0, 40),
        email: apiProfessional.email ? apiProfessional.email.trim().toLowerCase() : '',
        phone: apiProfessional.phone ? apiProfessional.phone.replace(/\D/g, "").slice(0, 10) : '',
        password: apiProfessional.password,
        image: apiProfessional.image ? apiProfessional.image.trim() : '',
        genre: apiProfessional.genre ? apiProfessional.genre.trim() : '',
        rating: apiProfessional.rating && !isNaN(apiProfessional.rating) ? Math.min(parseFloat(apiProfessional.rating), 5) : null,
        description: apiProfessional.description ? apiProfessional.description.trim() : '',
        years_exp: apiProfessional.years_exp ? apiProfessional.years_exp.trim() : '',
        categorias: apiProfessional.categorias.map(categoria => categoria.nombre.trim()),
        profesiones: apiProfessional.profesiones.map(profesion => profesion.name.trim()),
        CountryId: apiProfessional.CountryId,
        LocationId: apiProfessional.LocationId,
      
      };

      return normalizedProfessional;
    });

    // console.log(normalizedProfessionals);
    // console.log(normalizedProfessionals.map((profesional)=>profesional))

    // Crear todos los profesionales de una sola vez en la base de datos
    for (const normalizedProfessional of normalizedProfessionals) {
      const { categorias, profesiones, CountryId, LocationId,  } = normalizedProfessional;

      // Buscar la ubicación en la base de datos por el LocationId
      const location = await Location.findByPk(LocationId);

            // Crear el nuevo profesional en la base de datos
      const newProfesional = await Profesional.create(normalizedProfessional);

      // Asignar categorías, ocupaciones, país y ubicación al nuevo profesional
      const categoriesBDD = await Category.findAll({ where: { name: categorias } });
      await newProfesional.addCategories(categoriesBDD);

      const ocupationsBDD = await Ocupation.findAll({ where: { name: profesiones } });
      await newProfesional.addOcupations(ocupationsBDD);

      const country = await Country.findByPk(CountryId);
      await newProfesional.setCountry(country);

      
            if (location) {
        await newProfesional.setLocation(location);
      }
    }
   
    //console.log('Base de datos llenada exitosamente con los profesionales.');
  } catch (error) {
    throw Error(error.message);
   // console.error('Error al llenar la base de datos con los profesionales:', error.message);
  }
};


const getAllProfesionals = async () => {
  try {
    let profesionals = await Profesional.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] }
        },
        {
          model: Ocupation,
          attributes: ["id", "name", "CategoryId"],
          through: { attributes: [] }
        },
        {
          model: Country,
          attributes: ["id", "name"],
        },
        {
          model: Location,
          attributes: ["id", "name", "CountryId"],
        },
        {
          model: PostProfesional,
          attributes: ["id", "title", "image", "content", "softDelete"],
          where: {
            softDelete: false
          },
          required: false
        },
        {
          model: Review,
          attributes: ["id","content", "rating"]
        }
      ]
    });

    if (profesionals.length === 0) {
      await getAllProfesionalApi();
      profesionals = await Profesional.findAll({
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            through: { attributes: [] }
          },
          {
            model: Ocupation,
            attributes: ["id", "name", "CategoryId"],
            through: { attributes: [] }
          },
          {
            model: Country,
            attributes: ["id", "name"],
          },
          {
            model: Location,
            attributes: ["id", "name", "CountryId"],
          },
          {
            model: PostProfesional,
            attributes: ["id", "title", "image", "content", "softDelete"],
            where: {
              softDelete: false
            },
            required: false
          },
          {
            model: Review,
            attributes: ["id","content", "rating"]
          }
        ]
      });
    }

    if (profesionals.length === 0 || !profesionals) throw Error(`No hay profesionales a buscar`);

    // Filtrar los posts con softDelete en false
    profesionals = profesionals.map(profesional => {
      const filteredPosts = profesional.PostProfesionals.filter(post => !post.softDelete || post.softDelete === false);
      profesional.PostProfesionals = filteredPosts;
      return profesional;
    });

    const cleanedArray = cleanArray(profesionals);

    // return profesionals
    return cleanedArray;
  } catch (error) {
    throw Error(error.message);
  }
};


module.exports = { getAllProfesionals, getAllProfesionalApi };
