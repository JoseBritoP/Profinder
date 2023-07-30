const { Profesional, Client } = require('../../db');

const validateName = (name) => {
  if(!name) throw Error(`La propiedad name es obligatoria`);
  if(typeof name !== "string") throw Error(`El tipo de dato de name debe ser un string`);

  const namevalidated = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(name.trim());
  const firstNameLastName = name.split(" ");
  
  if(name.trim() === "") throw Error(`El nombre no puede estar vacío`);
  if(/\d/.test(name)) throw Error(`El nombre no puede contener números`);
  if(!namevalidated) throw Error(`El nombre no puede contener expresiones especiales o símbolos`);
  if(firstNameLastName.length < 1) throw Error('El nombre de usuario debe estar conformado por nombre y apellido');
};

const validateEmail = (email) => {
  if(!email) throw Error(`La propiedad email es obligatoria`);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  if(typeof email !== "string") throw Error(`El tipo de dato de email debe ser un string`);
  if(email.trim() === "") throw Error(`El email no puede estar vacío`);
  if(!emailRegex.test(email)) throw Error (`El email debe tener un formato de email - ejemplo: usuario@gmail.com`);
  //if(!emailRegexEnd.test(emailEnd)) throw Error(`El email no puede tener números o símbolos luego del dominio`)
};

const validatePassword = (password) => {
  if (!password) throw Error(`La contraseña es obligatoria`);
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)\S{6,15}$/;
  if (typeof password !== "string") throw Error(`El tipo de dato de la contraseña debe ser un string`);
  if (password.trim() === "") throw Error(`La contraseña no puede estar vacía o compuesta por espacios`);
  if (!passwordRegex.test(password)) throw Error(`La contraseña debe contener al menos una letra y un número, además de tener una longitud entre 6 y 15 caracteres`);
};

module.exports = async (req,res,next) => {
  const { usuario, name, email, password } = req.body;
  try {
    validateEmail(email)
    const profesionalEmail = await Profesional.findOne({where:{email:email}});
    const clientEmail = await Client.findOne({where:{email:email}});
    if( profesionalEmail || clientEmail) throw Error(`El correo ${email} está en uso`);
    validateName(name);
    validatePassword(password);
    next();
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};