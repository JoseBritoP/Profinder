const { Category } = require('../../db');


const createCateProf= async (profesionalId,categoryId)=>{
    const getCategory= await Category.findAll({
    where:{ 
        id: categoryId}
    });

   const cateId=getCategory[0]
   await cateId.setProfesionals(profesionalId)
   return  cateId
}

module.exports = createCateProf;
