const { Client, Profesional} = require('../../db');

const validateId = (id) => {
    if(!id || id === undefined || id === null) throw Error(`El id es obligatorio para editar el cliente`);
    // if(!Number(id)) throw Error(`El id del profesional debe solo númerico`);
    if(!Number(id) || id === undefined) throw Error(`Compruebe los datos para registrarse`);
  };

const validateName = (name) => {
    // if (!name) {
    //     throw Error("Por favor ingrese un nombre")
    // }
    if (typeof name !== "string") {
        throw Error("El nombre debe ser un string")
    }
    let regexSpecialCharacters = /^[a-zA-Z_ ]*$/
    if (!regexSpecialCharacters.test(name)) {
        throw Error("El nombre no puede contener caracteres especiales.")
    };
    if (name.length > 50) {
        throw Error("El nombre contiene muchos caracteres.")
    };
    // let firstAndLastName = name.split(" ");
    // if (firstAndLastName.length !== 2) {
    //     throw Error("La propiedad name debe contener nombre y apellido.")
    // }
}

const validateEmail = (email) => {
    // if (!email) {
    //     throw Error("Por favor ingrese un email")
    // };
    if (typeof email !== "string") {
        throw Error("El nombre debe ser un string.")
    };
    const emailRegexEnd = /^[a-zA-ZñÑ\s]+$/;
    //const emailEnd = email.split(".")[1];
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    if (!regexEmail.test(email)) {
        throw Error("Ingrese un email valido, Ej : usuario@gmail.com");
    }
    // if (!emailRegexEnd.test(emailEnd)) {
    //     throw Error("El email al final del dominio no puede contener numeros");
    // };


};

const validatePassword = (password) => {
    // if (!password) {
    //     throw Error("Ingrese una contraseña.")
    // }
}

const validatePhone = (phone) => {

    // if (!phone) {
    //     throw Error("Por favor ingrese un telefono")
    // }
    if (typeof phone !== "string") {
        throw Error("El tipo de dato de phone debe ser un string.")
    };
    if (phone.length !== 10) {
        throw Error("El telefono solo debe contar con 10 numeros.")
    }
    const regexPhone = /^[0-9]*$/

    if (!regexPhone.test(phone)) {
        throw Error("El telefono solo puede contener numeros.")
    };
};



const validateGenre = (genre) => {
    if (typeof genre !== "string") {
        throw Error("El tipo de dato de genre debe ser un string")
    };
    const genres = ["male", "female"]
    if (!genres.includes(genre)) {
        throw Error("Eliga un genero correcto.")
    };
};

const validateDescription = (description) => {
    if (typeof description !== "string") {
        throw Error("El tipo de dato de description debe ser un string.")
    }
    if (description.length > 150) {
        throw Error("La descripcion no puede contar con mas de 150 caracteres.")
    };
};

const validateUbication = (ubication) => {
    if (typeof ubication !== "string") {
        throw Error("El tipo de dato de ubication debe ser un string.");
    };
};

const validateImage = (image) => {
    const regexImage = /(https?:\/\/.*\.(?:jpg|jpeg|gif|png|svg))/i
    if (!regexImage.test(image[0])) {
        throw Error("La imagen debe ser una url y debe tener formato jpg|jpeg|gif|png|svg ")
    }

};

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, phone, image, genre, description, ubication } = req.body;
    try {
        // console.log(id)
        validateId(id);
        validateEmail(email);
        
        const client = await Client.findByPk(id);
        const profesionalEmail = await Profesional.findOne({where:{email: email}});
        const clientEmail = await Client.findOne({where:{email:email}});
        if(email !== client.email){
            if(profesionalEmail || clientEmail) throw Error(`El correo ${email} ya está en uso, pruebe con otro`);
          };
        validateName(name)
        validatePassword(password)
        validatePhone(phone)
        validateImage(image)
        validateGenre(genre)
        validateDescription(description)
        validateUbication(ubication)
    } catch (error) {
        return res.status(400).json(error.message);
    }
    next();
}