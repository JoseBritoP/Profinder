const { Profesional, PostProfesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { Country, Location } = require('../../db');
const { ProfesionalImagesPost } = require('../../db');
const { Review } = require("../../db");

const cleanArrayProfesionalId = require('../../helpers/cleanArrayProfesionalById');

const getProfesionalById = async (id) => {
  const parseNumber = Number(id);
  if (!Number(id)) throw Error(`El id debe ser numérico!`);

  const profesional = await Profesional.findByPk(parseNumber, {
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

  if (!profesional) throw Error(`No existe el profesional de id: ${id}`);

  // Filtrar los posts con softDelete en false

  const formattedProfesional = cleanArrayProfesionalId(profesional);
  return [formattedProfesional];
};

module.exports = getProfesionalById;
