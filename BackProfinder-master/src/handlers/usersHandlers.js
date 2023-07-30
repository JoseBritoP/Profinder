const sequelize = require('sequelize');
const { Profesional,Client } = require('../db');
// Resto del código...



const getUsers= async(req,res)=>{
  try {
    const dbUserClient= await Client.findAll()
    return res.status(200).json({ dbUserClient })

  } catch (error) {
    res.status(404).json({ error: 'Error al obtener el usuario' });
    
  }
}




const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Lógica para obtener un usuario por su ID
    const user = await Profesional.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: 'Error al obtener el usuario' });
  }
};



const createUserClient = async (req, res) => {
  try {
    const { name, email, image, genre, description } = req.body;

    // Verificación de las propiedades una por una
    if (!name) {
      return res.status(404).json({ error: 'Falta la propiedad name' });
    }

    if (!email) {
      return res.status(404).json({ error: 'Falta la propiedad email' });
    }

    if (!image) {
      return res.status(404).json({ error: 'Falta la propiedad image' });
    }

    if (!genre) {
      return res.status(404).json({ error: 'Falta la propiedad genre' });
    }

    if (!description) {
      return res.status(404).json({ error: 'Falta la propiedad description' });
    }

    // Aquí puedes agregar cualquier otra validación adicional que necesites para los datos recibidos

    // Crea el usuario en la base de datos utilizando el modelo Profesional
    const newUser = await Client.create({
      name,
      email,
      image,
      genre,
      description,
      active: true,
      pro: true
    });

    // Aquí puedes realizar cualquier otra acción adicional después de crear el usuario

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: 'Error al crear el usuario' });
  }
};
const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, image, genre, years_exp, description } = req.body;

    // Lógica para actualizar un usuario por su ID
    const user = await Profesional.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualiza los datos del usuario
    user.name = name;
    user.email = email;
    user.image = image;
    user.genre = genre;
    user.years_exp = years_exp;
    user.description = description;

    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: 'Error al actualizar el usuario' });
  }
};

module.exports = {
  getUsers,
  getUser,
  putUser,
  createUserClient,

};
