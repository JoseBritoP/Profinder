// Assuming this is your controller file (e.g., postProfesionalController.js)

const { sequelize } = require("../../db");
const { PostProfesional } = require("../../db.js");

const logicDeletePostProfesional = async (id) => {
  try {
    const dbPost = await PostProfesional.findByPk(id);

    if (!dbPost) {
      throw new Error("El id del Post solicitado no fue encontrado.");
    }

    // Soft delete the post by updating the "softDelete" attribute
    await dbPost.update({ softDelete: true });

    return "El Post fue borrado exitosamente.";
  } catch (error) {
    throw error;
  }
};

module.exports = { logicDeletePostProfesional };
