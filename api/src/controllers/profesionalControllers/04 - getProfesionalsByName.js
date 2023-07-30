const { Op } = require('sequelize');
const { Profesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { Review } = require('../../db');
const { PostProfesional } = require('../../db');
const cleanArray = require('../../helpers/cleanArrayProfesionals');

const getProfesionalsByName = async (name) => {
  const query = name.toLowerCase().trim();
  const formattedQuery = `%${name}%`

  const profesionalsByName = await Profesional.findAll({
    where: {
      name: {
        [Op.iLike]: formattedQuery,
      }
    },
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
        model: PostProfesional,
        attributes: ["id", "title", "image", "content"]
      },
      {
        model: Review,
        attributes: ["content", "rating"]
      }
    ]
  });
  if (profesionalsByName.length === 0) throw Error(`No hay profesionales llamados ${query}`);

  const formattedProfesionals = cleanArray(profesionalsByName);

  return formattedProfesionals;
};

module.exports = getProfesionalsByName;// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8