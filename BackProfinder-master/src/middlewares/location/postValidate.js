const { Location } = require('../../db');

module.exports = async (req,res,next) => {
  const { name, countryId } = req.body;

  if(name.trim()==="" || /\d/.test(name)){
    return res.status(400).json({error: `El nombre no puede estar vacío o tener números`});
  }

  const nameLocationFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const matchLocationName = await Location.findOne({where:{name:nameLocationFormat}});
  if(matchLocationName){
    return res.status(400).json({error: `Ya existe una localidad llamada ${nameLocationFormat}`});
  };

  if(!countryId || !Number(countryId) || countryId === ""){
    return res.status(400).json({error: "El id del país asociada debe ser válida"});
  }

  next();
};