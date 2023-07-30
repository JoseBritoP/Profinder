const { PostProfesional, Profesional } = require("../../db.js");

const createPostProfesional = async (title, image, content, ProfesionalId, category, ocupation) => {
 
  const postProfesionalFormat = {
    title,
    image,
    content,
    ProfesionalId,
    category,
    ocupation,
  };

    // Paso 1: Obtener el profesional por su ID
  const profesional = await Profesional.findByPk(ProfesionalId);

  if (!profesional) throw new Error(`El profesional con ID ${ProfesionalId} no existe`);

  // Paso 2: Verificar si el profesional está inactivo y ya tiene un post existente
  if (!profesional.active) {
    const existingPost = await PostProfesional.findOne({
      where: { 
        ProfesionalId,
        softDelete: false,
      },
      
    });

    if (existingPost) {
      throw new Error("El profesional no esta activo en el Plan Premium y ya tiene un post existente");
    }
  }

  // Paso 3: Crear el nuevo post si todo está bien
  const newPostProfesional = await PostProfesional.create(postProfesionalFormat);

  if (!newPostProfesional) throw new Error(`No se pudo crear el profesional llamado: ${title}`);

  return {
    id: newPostProfesional.id,
    title: newPostProfesional.title,
    content: newPostProfesional.content,
    ProfesionalId: newPostProfesional.ProfesionalId,
    category: newPostProfesional.category,
    ocupation: newPostProfesional.ocupation,
  };
};

module.exports = createPostProfesional;
