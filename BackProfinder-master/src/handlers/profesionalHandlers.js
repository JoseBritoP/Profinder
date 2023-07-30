// Controllers:

const { Profesional } = require('../db');
const { Category } = require('../db');
const { Ocupation } = require('../db');
const { Country } = require('../db');
const { Location } = require('../db');
const { PostProfesional } = require("../db")
const cleanArray = require('../helpers/cleanArrayProfesionals')


const { searchUserProfesional, getProfById, getProfByIdActive, getProfByIdReverse, getProfByIdNotActive } = require("../controllers/profesionalControllers/profesionalsControllers")


const { createProfesional, getAllProfesionals, getAllProfesionalApi, getProfesionalById, getPresionalsByName, updateProfesional, getAllProfesionalsDelete, ratingProfesional } = require('../controllers/profesionalControllers/index');



// Handlers: 




const getProfesionalsPremiun = async (req, res) => {

  try {
  
    const profesionals = await Profesional.findAll({
      where: {
        active: true
      },

      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] }
        },
        {
          model: Ocupation,
          attributes: ["id", "name", "CategoryId"],
          through: { attributes: [] }
        },
        {
          model: PostProfesional,
          attributes: ["id", "title", "image", "content"]
        },
        {
          model: Review,
          attributes: ["content", "rating"]
        }
      ]
    });

    if (!profesionals || profesionals.length === 0) {
      // No hay clientes en la base de datos, llamar a la función para obtener los clientes de la API y llenar la base de datos
      return res.status(200).json({ message: 'Actualmente no hay profesionales premiun' });

    }

    else { return res.status(200).json(profesionals) };

  } catch (error) {

    return res.status(404).json({ error: error.message });
  }
};


const getProfesionalsNotPremiun = async (req, res) => {
  try {
   
    const profesionals = await Profesional.findAll({
      where: {
        active: false
      },

      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] }
        },
        {
          model: Ocupation,
          attributes: ["id", "name", "CategoryId"],
          through: { attributes: [] }
        },
        {
          model: PostProfesional,
          attributes: ["id", "title", "image", "content"]
        },
        {
          model: Review,
          attributes: ["content", "rating"]
        }
      ]
    });



    if (!profesionals || profesionals.length === 0) {
      // No hay clientes en la base de datos, llamar a la función para obtener los clientes de la API y llenar la base de datos
      return res.status(200).json({ message: 'Actualmente todos los profesionales son premiun' });

    }

    else { return res.status(200).json(profesionals) };
  } catch (error) {

    return res.status(404).json({ error: error.message });
  }
};



const getProfesionalsDelete = async (req, res) => {

  try {
    
    const profesionals = await Profesional.findAll({
      where: {
        softDelete: true
      },

      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] }
        },
        {
          model: Ocupation,
          attributes: ["id", "name", "CategoryId"],
          through: { attributes: [] }
        },
        {
          model: PostProfesional,
          attributes: ["id", "title", "image", "content"]
        },
        {
          model: Review,
          attributes: ["content", "rating"]
        }


      ]
    });



    if (!profesionals || profesionals.length === 0) {
      // No hay clientes en la base de datos, llamar a la función para obtener los clientes de la API y llenar la base de datos
      return res.status(200).json({ message: 'Actualmente no hay profesionales baneados' });

    }

    else { return res.status(200).json(profesionals) };
  } catch (error) {

    return res.status(404).json({ error: error.message });
  }
};




const getProfesionalsNotDelete = async (req, res) => {
  try {

    const profesionals = await Profesional.findAll({
      where: {
        softDelete: null
      },

      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] }
        },
        {
          model: Ocupation,
          attributes: ["id", "name", "CategoryId"],
          through: { attributes: [] }
        },
        {
          model: PostProfesional,
          attributes: ["id", "title", "image", "content"]
        },
        {
          model: Review,
          attributes: ["content", "rating"]
        }
      ]
    });



    if (!profesionals || profesionals.length === 0) {
      // No hay clientes en la base de datos, llamar a la función para obtener los clientes de la API y llenar la base de datos
      return res.status(200).json({ message: 'Actualmente todos los profesionales estan baneados' });

    }

    else { return res.status(200).json(profesionals) };
  } catch (error) {

    return res.status(404).json({ error: error.message });
  }
};




const getProfesionals = async (req, res) => {
  const { name } = req.query
  try {
    let profesionals = await getAllProfesionals();
    if (name) {
      profesionals = await getPresionalsByName(name)
    }

    if (!profesionals || profesionals.length === 0) {
      // No hay clientes en la base de datos, llamar a la función para obtener los clientes de la API y llenar la base de datos
      await getAllProfesionalApi();

      // Obtener los clientes actualizados
      profesionals = await getAllProfesionals();
    }

    return res.status(200).json(profesionals);
  } catch (error) {
 
    return res.status(404).json({ error: error.message });
  }
};




const getProfesional = async (req, res) => {

  const { id } = req.params;

  try {

    const profesional = await getProfesionalById(id);

    return res.status(200).json(profesional);

  } catch (error) {

    return res.status(404).json({ error: error.message })

  };

};





const bePremiun = async (req, res) => {

  const { id } = req.params;

  try {

    const dbProf = await getProfByIdActive(id);

    if (dbProf.length === 0) { res.send("The indicated Profesional's id has not been found")}

    else res.status(200).json(dbProf)

  } catch (error) {

    res.status(404).json({ error: error.message })

  };

};


const notBePremiun = async (req, res) => {

  const { id } = req.params;

  try {
    const dbProf = await getProfByIdNotActive(id);

    if (dbProf.length === 0) { res.send("The indicated Profesional's id has not been found")}

    else res.status(200).json(dbProf)

  } catch (error) {

    res.status(404).json({ error: error.message })

  };

};









const logicDelete = async (req, res) => {

  const { id } = req.params;

  try {

    const dbProf = await getProfById(id);

    if (dbProf.length === 0) { res.send("The indicated Profesional's id has not been found")
  }
    else res.status(200).json(dbProf)

  } catch (error) {

    res.status(400).json({ error: error.message })

  };

};




const reverseDelete = async (req, res) => {

  const { id } = req.params;

  try {
    const dbProf = await getProfByIdReverse(id);

    if (dbProf.length === 0) { res.send("The indicated Profesional's id has not been found")}

    else res.status(200).json(dbProf)

  } catch (error) {

    res.status(400).json({ error: error.message })

  };

};






const createUserProfesional = async (req, res) => {
  const { name, email, password, image, genre, years_exp, categories, ocupations, phone, ubication, CountryId, LocationId } = req.body;

  try {
    const newUser = await createProfesional(name, email, password, image, genre, years_exp, categories, ocupations, phone, ubication, CountryId, LocationId);
    return res.status(201).json({ profesionalCreated: newUser });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
};




const putProfesional = async (req, res) => {
  const { id } = req.params;
  let { name, email, password, image, genre, years_exp, description, categories, ocupations, phone, ubication, CountryId, LocationId } = req.body;

  // Convert LocationId to a number if it's a string containing a numeric value
  LocationId = parseInt(LocationId, 10);

  // Validate that LocationId is a number
  if (typeof LocationId !== 'number' || isNaN(LocationId)) {
    return res.status(400).json({ error: 'LocationId must be a valid number' });
  }

  try {
    const updatedProfesional = await updateProfesional(id, name, email, password, image, genre, years_exp, description, categories, ocupations, phone, ubication, CountryId, LocationId);
    return res.status(200).json(updatedProfesional);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};





module.exports = {
  createUserProfesional,
  getProfesionals,
  getProfesional,
  logicDelete,
  putProfesional,
  getProfesionalsDelete,
  getProfesionalsNotDelete,
  getProfesionalsPremiun,
  getProfesionalsNotPremiun,
  bePremiun,
  reverseDelete,
  notBePremiun
};