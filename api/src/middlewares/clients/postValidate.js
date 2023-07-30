const { Client } = require("../../db.js");

const validateName = (name) => {

    if (!name) {
        throw Error("La propiedad name no puede estar vacia.")
    };
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
    let firstAndLastName = name.split(" ");
    if (firstAndLastName.length !== 2) {
        throw Error("La propiedad name debe contener nombre y apellido.")
    }
}

const validateEmail = (email) => {
    if (!email) {
        throw Error("Por favor ingrese un email")
    };
    if (typeof email !== "string") {
        throw Error("El nombre debe ser un string.")
    };
    const emailRegexEnd = /^[a-zA-ZñÑ\s]+$/;
    //const emailEnd = email.split(".")[1];
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;;

    if (!regexEmail.test(email)) {
        throw Error("Ingrese un email valido, Ej : usuario@gmail.com");
    }
    // if (!emailRegexEnd.test(emailEnd)) {
    //     throw Error("El email al final del dominio no puede contener numeros");
    // };


};

const validatePassword = (password) => {
    if (!password) {
        throw Error("Ingrese una contraseña.")
    }
}

const validatePhone = (phone) => {
    if (!phone) {
        throw Error("Por favor ingrese un numero de telefono.")
    }

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



module.exports = async (req, res, next) => {
    const { name, email, phone, image, genre, description, ubication } = req.body
    try {

        const matchEmail = await Client.findOne({ where: { email: email } });
        if (matchEmail) {
            return res.status(404).json({ error: `Ya existe un cliente asociado con el email de ${email}` });
        };
        validateName(name);
        validateEmail(email);
        validatePhone(phone);

    } catch (error) {
        console.log(error);
        return res.status(404).json(error.message)
    }
    next()

};