const { Profesional, Client, Category, Ocupation, Country, Location } = require('../../db');
const cleanArrayProfesionalFavorites = require('../../helpers/cleanArrayProfesionalsFavorites');

const createContact = async (id, profesionalId) => {
  const client = await Client.findByPk(id);
  if (!client) throw Error(`No existe el cliente de id ${id}`);

  const profesional = await Profesional.findByPk(profesionalId);
  if (!profesional) throw Error(`No existe el profesional de id ${profesionalId}`);

  // Verificar si el profesional ya está en la lista de favoritos del cliente
  const isAlreadyFavorite = await client.hasProfesional(profesional);
  if (isAlreadyFavorite) {
    // Si el profesional ya está en la lista de favoritos, simplemente devuelve la lista actual de favoritos
    const clientWithProfesionals = await Client.findByPk(id, {
      attributes: ["id", "name", "email", "phone"],
      include: {
        model: Profesional,
        attributes: ["id", "name", "email", "image", "genre", "rating", "years_exp"],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
          {
            model: Ocupation,
            attributes: ["id", "name", "CategoryId"],
            through: { attributes: [] },
          },
          {
            model: Country,
            attributes: ["id", "name"],
          },
          {
            model: Location,
            attributes: ["id", "name"],
          },
        ],
        through: { attributes: [] },
      },
    });
    const cleanInfo = cleanArrayProfesionalFavorites(clientWithProfesionals.Profesionals);
    return cleanInfo;
  }

  // Agregar el profesional a la lista de favoritos del cliente
  await client.addProfesional(profesional);

  // Devolver la lista actualizada de favoritos después de agregar el profesional
  const updatedClientWithProfesionals = await Client.findByPk(id, {
    attributes: ["id", "name", "email", "phone"],
    include: {
      model: Profesional,
      attributes: ["id", "name", "email", "image", "genre", "rating", "years_exp"],
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: Ocupation,
          attributes: ["id", "name", "CategoryId"],
          through: { attributes: [] },
        },
        {
          model: Country,
          attributes: ["id", "name"],
        },
        {
          model: Location,
          attributes: ["id", "name"],
        },
      ],
      through: { attributes: [] },
    },
  });
  const updatedCleanInfo = cleanArrayProfesionalFavorites(updatedClientWithProfesionals.Profesionals);
  return {
    profesionalId: profesionalId
  }
  return updatedCleanInfo;
};

module.exports = createContact;
