const { Country, Location } = require('../../db');

const getCountry = async (id) => {
  const country = await Country.findByPk(id,{
    include:{
      model: Location,
      attributes: ["id","name","CountryId"]
    }
  });
  if(!country) throw Error(`No existe el país de id: ${id}`);
  return country;
};

module.exports = getCountry;