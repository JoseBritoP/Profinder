// Controllers:

const { getCountries, createCountry,getCountry} = require('../controllers/countryControllers/index');

// Handlers:

const getAllCountries = async (req,res) => {
  try {
    const countries = await getCountries()
    return res.status(200).json(countries)
  } catch (error) {
    return res.status(404).json({error: error.message});
  };
};

const getCountryById = async (req,res) => {
  const { id } = req.params;
  try {
    const country = await getCountry(id);
    return res.status(200).json(country);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const postCountry = async (req,res) => {
  const { name } = req.body;
  try {
    const newCountry = await createCountry(name);
    return res.status(201).json({countryCreated: newCountry});
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

module.exports = {
  getAllCountries, postCountry,getCountryById
}