// Controllers:

const {getLocations, createLocation,getLocation} = require('../controllers/locationControllers/index');

// Handlers

const getAllLocations = async (req,res) => {
  // return res.status(200).json({mjs: "Se traerán todas las localidades"})
  try {
    const locations = await getLocations();
    return res.status(200).json(locations);
  } catch (error) {
    return res.status(404).json({error: error.message});
  };
};

const getLocationById = async (req,res) => {
  const { id } = req.params;

  try {
    const location = await getLocation(id);
    return res.status(200).json(location)
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const postLocation = async (req,res) => {
  // return res.status(201).json({mjs: "Se creará una localidad"})
  const {name,countryId} = req.body
  try {
    const newLocation = await createLocation(name,countryId);
    return res.status(201).json(newLocation)    
  } catch (error) {
    return res.status(404).json({error: error.message});
  };
};

module.exports = {getAllLocations,postLocation,getLocationById};