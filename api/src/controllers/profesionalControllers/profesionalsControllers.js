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
        softDelete: elemento.softDelete,
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






const getProfById = async (id) => {

    const dbProf = await sequelize.query(`UPDATE "Profesionals" set "softDelete"=true where id=${id}`);

    if (dbProf.length !== 0) { return ("The professional was deleted successfully") }
};







const getProfByIdReverse= async (id) => {

    const dbProf = await sequelize.query(
        `UPDATE "Profesionals" set "softDelete"=null where id=${id}`);

    if (dbProf.length !== 0) { return ("El profesional ha sido restaurado satisfactoriamente") }

};








const getProfByIdActive = async (id) => {

    const dbProf = await sequelize.query(
        `UPDATE "Profesionals" set "active"=true where id=${id}`);

    if (dbProf.length !== 0) { return ("El profesional ahora es premiun") }

};






const getProfByIdNotActive = async (id) => {

    const dbProf = await sequelize.query(
        `UPDATE "Profesionals" set "active"=false where id=${id}`);

    if (dbProf.length !== 0) { return ("El profesional ahora no es premiun") }

};








module.exports = {
    searchUserProfesional,
    getAllProfesionals,
    getProfById,
    getProfByIdActive,
    getProfByIdReverse,
    getProfByIdNotActive
}