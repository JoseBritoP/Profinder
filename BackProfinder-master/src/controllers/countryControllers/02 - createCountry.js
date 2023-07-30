const { Country } = require('../../db');

const createCountry = async (name) => {
  const nameCountryFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const newCountry = await Country.create({name: nameCountryFormat});
  // console.log(newCountry);
  if(!newCountry) throw Error(`No se pudo crear el país llamado: ${nameCountryFormat}`);

  return newCountry;
}

module.exports = createCountry