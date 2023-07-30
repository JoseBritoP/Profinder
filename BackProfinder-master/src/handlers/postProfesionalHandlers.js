//Controllers
const { getAllPostsBySoftDelete,getDeletedPosts,getActivePosts, createPostProfesional, logicDeletePostProfesional, getAllPostsByProfesionalsApi,updatePostProfesional,getPostProfesionalById,getAllPosts } = require("../controllers/postProfesionalcontrollers/index")
//Handlers

const getAllPostsProfesionalHandler = async (req, res) => {
  try {
    const allPosts = await getAllPostsByProfesionalsApi();
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getPostProfesionalId = async (req,res) => {
  const { id } = req.params;
  try {
    const postProfesional = await getPostProfesionalById(id);
    return res.status(200).json(postProfesional);
  } catch (error) {
    return res.status(404).json({error : error.message});
  }
};

const createPostHandler = async (req, res) => {
  const { title, image, content, ProfesionalId, category, ocupation } = req.body
  //console.log("Valor de ProfesionalId recibido en la solicitud:", ProfesionalId);

  try {
    const post = await createPostProfesional(title,  image, content, ProfesionalId,category, ocupation,)
    return res.status(201).json(post)
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}


const putPostProfesional = async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  const { title, image, content,  ProfesionalId,category, ocupation } = req.body;
  
  try {
        
    const updatedPostProfesional = await updatePostProfesional(id, title, image, content, ProfesionalId, category, ocupation);
    
    return res.status(200).json(updatedPostProfesional );
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
  
};
const logicPostProfesionalHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const dbPost = await logicDeletePostProfesional(id);

    if (dbPost.length === 0) { res.send("El Post no ha sido encontrado") }
    else res.status(200).json(dbPost)

  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}


// Handler para obtener todos los posts, filtrados o sin filtrar según el valor de "softDelete"
async function getAllPostsHandler(req, res) {
  try {
    // Obtener el valor de "softDelete" de los parámetros de la URL (req.query)
    const softDelete = req.query.softDelete;

    // Verificar si el valor de "softDelete" está definido en la solicitud
    if (typeof softDelete === 'undefined') {
      // Llamar al controlador para obtener todos los posts sin filtrar
      const allPosts = await getAllPostsBySoftDelete(null);
      // Responder con los posts obtenidos
      return res.status(200).json(allPosts);
    }

    // Convertir el valor de "softDelete" a un booleano
    const isSoftDelete = softDelete === 'true'; // Convierte el string en un booleano

    // Validar que el valor de "softDelete" sea un booleano
    if (typeof isSoftDelete !== 'boolean') {
      return res.status(404).json({ error: 'El valor de "softDelete" debe ser true o false' });
    }

    let posts;

    // Llamar al controlador correspondiente según el valor de "softDelete"
    if (isSoftDelete) {
      posts = await getAllPostsBySoftDelete(true);
    } else {
      posts = await getAllPostsBySoftDelete(false);
    }

    // Responder con los posts obtenidos
    res.status(200).json(posts);
  } catch (error) {
    // Manejo de errores
    console.error('Error en el handler de obtener posts:', error);
    res.status(404).json({ error: 'Ocurrió un error al obtener los posts' });
  }
}

module.exports = {
  getAllPostsProfesionalHandler,
  createPostHandler,
  putPostProfesional,
  getPostProfesionalId,
  logicPostProfesionalHandler,
  getAllPostsHandler
}