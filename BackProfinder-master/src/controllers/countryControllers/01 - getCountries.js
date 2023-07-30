const { Country } = require('../../db');
const { Location } = require('../../db');

const data = require('../../data/country-locations.json');

const getCountries = () => {
 
    const countries = data.map((country)=>{
      return {
        id: country.id,
        name: country.name,
      }
    });
    const promises = countries.map((country)=>{
      return Country.findOrCreate({where:country})
    });

    return Promise.all(promises)
    .then(()=>{
      const countries = Country.findAll({include:{
        model: Location,
        attributes:[ "id","name"]
      }});
      if(countries.length === 0) throw Error(`No se pudo llenar la base de datos`);
      console.log("Base de datos llenada exitosamente con los países");
      return countries;
    })
    .catch((error)=>{
      throw Error(error.message);
    });
};

module.exports = getCountries;