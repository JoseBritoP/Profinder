const { Profesional } = require("../../db.js")


const validateTitle = (title) => {
    if (!title) {
        throw Error("La propiedad title no puede estar vacia.")
    };
    if (typeof title !== "string") {
        throw Error("El tipo de dato de title debe ser un string")
    }
    let regexTitle = /^[a-zA-ZñÑ\s]+$/
    if (!regexTitle.test(title)) {
        throw Error("El titulo no puede contener numeros, caracteres especiales, etc.")
    };
}


const validateIdProfesional = (id) => {
    if (!id) throw Error("El posteo debe estar relacionado con el id de un profesional válido.")
    
}



module.exports = async (req, res, next) => {
    const { title, image, content, profesionalId } = req.body
    try {
        validateIdProfesional(profesionalId);
        const profesionalFound = await Profesional.findByPk(profesionalId)
        if (!profesionalFound) throw Error(`No existe un profesional que tenga el id ${profesionalId}`);
        validateTitle(title);
        validateImage(image);
        validateContent(content);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
    next()
}