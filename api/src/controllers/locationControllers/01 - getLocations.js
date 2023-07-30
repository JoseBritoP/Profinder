const { Location } = require('../../db');
const data = require('../../data/locations.json');

const getLocations = async () => {
  const locationsData = data.map((location) => {
    const locationFormat = {
      name: location.name,
      CountryId: location.countryId,
 
    };
    return Location.findOrCreate({ where: locationFormat });
  });

  return Promise.all(locationsData)
    .then(() => {
      const locations = Location.findAll();
      return locations;
    })
    .catch((error) => {
      throw Error(error.message);
    });
};

module.exports = getLocations;
