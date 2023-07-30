const { Ocupation } = require('../../db');

module.exports = async (req,res,next) => {

  const { name, categoryId } = req.body;

  const nameOcupationFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const matchOcupationName = await Ocupation.findOne({where:{name: nameOcupationFormat}});
    if(matchOcupationName){
      return res.status(400).json({error: `Ya existe una ocupación llamada ${nameOcupationFormat}`});
    }

  if(name === "" || /\d/.test(name)){
    return res.status(400).json({error: "El nombre no puede estar vacío o contener números"});
  };

  if(!categoryId || !Number(categoryId) || categoryId === ""){
    return res.status(400).json({error: "El id de la categoría asociada debe ser valida"});
  };

  next();
};