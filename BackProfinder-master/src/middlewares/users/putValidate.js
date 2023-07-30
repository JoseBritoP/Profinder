const validatePassword = (password) => {
    if (!password) throw Error(`La contraseña es obligatoria`);
    const passwordRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (typeof password !== "string") throw Error(`El tipo de dato de la contraseña debe ser un string`);
    if (password.trim() === "") throw Error(`La contraseña no puede estar vacía o compuesta por espacios`);
    if (!passwordRegex.test(password)) throw Error(`La contraseña debe contener al menos una letra y un número, además de tener una longitud entre 6 y 15 caracteres`);
};


module.exports = async (req, res, next) => {
    const { password } = req.body;
    try {
        validatePassword(password);
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};