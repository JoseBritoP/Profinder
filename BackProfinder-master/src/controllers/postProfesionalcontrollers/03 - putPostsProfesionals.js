const { PostProfesional } = require("..//..//db")
const { Op } = require('sequelize');

const updatePostProfesional = async (id, title, image, content, ProfesionalId,  category, ocupation) => {
  //console.log("--image en el controller--");

   const profesionalPostInBDD = await PostProfesional.findByPk(id)
     if (!profesionalPostInBDD) throw Error(`No existe el post del profesional de id: ${id}`);
 

  // Update postProfesional

  profesionalPostInBDD.title = title  || profesionalPostInBDD.title;
  profesionalPostInBDD.image = image || profesionalPostInBDD.image;
  profesionalPostInBDD.content = content !== undefined ? content : profesionalPostInBDD.content;
  profesionalPostInBDD.ProfesionalId = ProfesionalId || profesionalPostInBDD.ProfesionalId;
  profesionalPostInBDD.category = category|| profesionalPostInBDD.ProfesionalId;category;
  profesionalPostInBDD.ocupation = ocupation || profesionalPostInBDD.ocupation;
  await profesionalPostInBDD.save();

 return profesionalPostInBDD
  // return {
  //   id: profesionalPostInBDD.id,
  //   title: profesionalPostInBDD.title,
  //   image: profesionalPostInBDD.image,
  //   content: profesionalPostInBDD.content,
  //   ProfesionalId: profesionalPostInBDD.ProfesionalId,
  //   category: profesionalPostInBDD.category,
  //   ocupation: profesionalPostInBDD.ocupation
  // };
};

module.exports = updatePostProfesional;