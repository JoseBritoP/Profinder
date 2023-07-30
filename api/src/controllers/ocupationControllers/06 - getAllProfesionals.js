
const { Op } = require("sequelize");
const { Profesional, sequelize } = require('../../db');
const { Ocupation } = require('../../db')
const { QueryTypes } = require('sequelize');
const { Category } = require("../../db");
const { ProfesionalCategory } = require('../../db');
const { PostProfesional } = require("../../db")



const cleanArray = (Array) => Array.map((elemento) => {

    const categories = [];
    for (var i = 0; i < elemento.Categories.length; i++) {
        var objeto = {
            category: elemento.Categories[i].name,
            ocupations: []
        };

        categories.push(objeto)
    }




    return {
        id: elemento.id,
        name: elemento.name,
        email: elemento.email,
        image: elemento.image,
        genre: elemento.genre,
        rating: elemento.rating,
        years_exp: elemento.years_exp,
        description: elemento.description,
        active: elemento.active,
        pro: elemento.pro,
        professions: categories,
        posts: elemento.PostProfesionals
    }
}
);











const searchUserProfesional = async (name) => {
    const dbInf = await Profesional.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    return dbInf
};


const getAllProfesionals = async () => {
    const allProf = await Profesional.findAll({
        include: [
            {
                model: Category,
                attributes: ["name"],
                through: [],
            },
            {
                model: Ocupation,
                attributes: ["name"],
                through: [],
            },
            {
                model: PostProfesional,
                attributes: ["id", "title", "image", "content"]
            }
        ]
    }
    )
    const profClean = cleanArray(allProf)
    return profClean
};

module.exports = {
    getAllProfesionals,
}