// Controllers

const {  createContact, updateContact, getContactById, getAllContacts, } = require('../controllers/contactController/index');

// Handlers

const getContacts = async (req,res) => {
  try {
    const clients = await getAllContacts();
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(404).json({error: error.message});

  };
  // return res.status(200).json({DIY: "En esta ruta se obtendrán todas las relaciones de los clientes con los profesionales"});
};

const getContact = async (req,res) => {
  const { id } = req.params
  try {
    const client = await getContactById(id);
    return res.status(200).json(client);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
  // return res.status(200).json({DIY:`En esta ruta se obtendrá la relación del Cliente de ${id} con los Profesionales`});
};

const postContact = async (req,res) => {
  const {id} = req.params
  const {profesionalId} = req.body;
  try {
    const clientWithProfesionals = await createContact(id,profesionalId);
    return res.status(201).json(clientWithProfesionals);
  } catch (error) {
    return res.status(404).json({error: error.message});
  };
  // return res.status(201).json({DIY: `En esta ruta se creará la relación del Cliente de id ${id} con los profesionales de ids ${profesionalId}`});
};

const putContact = async (req,res) => {
  const {id} = req.params
  const {profesionalId} = req.body;
  try {
    const clientWithProfesionalsUpdated = await updateContact(id,profesionalId);
    return res.status(201).json(clientWithProfesionalsUpdated);
  } catch (error) {
    return res.status(404).json({error: error.message});
  };
  // return res.status(200).json({DIY: `En esta ruta se actualizará la relación del Cliente de id ${id} con los profesionales de id ${profesionalIds}`});
}

module.exports = {getContacts,getContact,postContact,putContact}