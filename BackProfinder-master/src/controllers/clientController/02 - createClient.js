const { Client } = require("../../db.js");
const { Country } = require('../../db.js');
const { Location } = require('../../db.js');
const { getImageUrl } = require("../../firebase.js");


const createClient = async (name, email, password, image, genre, phone, CountryId, LocationId) => {


    if (!name || !email || !password || !phone || !image || !genre || !CountryId || !LocationId) {
        throw Error("Faltan datos a completar")
    }

    const country = await Country.findByPk(CountryId)
    const location = await Location.findByPk(LocationId)
    const imageUrl = await getImageUrl(image)
    const newClientFormat = {
        name,
        email,
        password: password,
        image: imageUrl,
        genre,
        phone,
        active: true
    };



    const newClient = await Client.create(newClientFormat);
    await newClient.setCountry(country.id)
    await newClient.setLocation(location.id)
    if (!newClient) throw Error(`No se pudo crear el profesional llamado: ${name}`);

    return newClient;
    
    // return {
    //     id: newClient.id,
    //     name: newClient.name,
    //     email: newClient.email,
    //     image: newClient.image.split(".com")[0] + "avatar",
    //     password: newClient.password,
    //     genre: newClient.genre,
    //     phone: newClient.phone,
    //     country: country.name,
    //     location: location.name,
    // };

};

module.exports = createClient;
