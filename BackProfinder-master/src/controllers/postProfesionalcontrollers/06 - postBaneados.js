const { PostProfesional } = require('..//..//db'); // Asegúrate de ajustar la ruta del archivo de modelos según tu estructura de proyecto

// Controlador para obtener todos los posts activos
async function getActivePosts() {
  try {
    const activePosts = await PostProfesional.findAll({
      where: {
        softDelete: false,
      },
    });
    return activePosts;
  } catch (error) {
    console.error('Error fetching active posts:', error);
    throw error;
  }
}

// Controlador para obtener todos los posts eliminados
async function getDeletedPosts() {
  try {
    const deletedPosts = await PostProfesional.findAll({
      where: {
        softDelete: true,
      },
    });
    return deletedPosts;
  } catch (error) {
    console.error('Error fetching deleted posts:', error);
    throw error;
  }
}

// Controlador para obtener todos los posts filtrados por el valor de "softDelete" (true o false)
async function getAllPostsBySoftDelete(softDeleteValue) {
  try {
    const posts = await PostProfesional.findAll({
      where: {
        softDelete: softDeleteValue,
      },
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

module.exports = {
  getActivePosts,
  getDeletedPosts,
  getAllPostsBySoftDelete,
};
