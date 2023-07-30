const { Country } = require('../../db');

module.exports = async (req,res,next) => {
  const { name } = req.body;

  if(name === "" || /\d/.test(name)) {
    return res.status(400).json({error:`El país no puede estar vacío o contener números`});
  };

  if(name.length < 3 && name.length > 15){
    return res.status(400).json({error:`El país debe contar entre 3 y 15 caracteres`});
  };
  const nameCountryFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const countryMatch = await Country.findOne({where:{name:nameCountryFormat}});

  if(countryMatch){
    return res.status(400).json({error:`Ya existe un país llamado: ${nameCountryFormat}`});
  };

  next();
};