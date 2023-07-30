// routes/registros.js

const express = require('express');
const router = express.Router();

// Importa los modelos y otros módulos necesarios
const Registro = require('../models/Registro');

// Ruta GET /registros
router.get('/', async (req, res) => {
  try {
    // Obtiene los registros de la base de datos utilizando el modelo Registro
    const registros = await Registro.find();

    // Envía los registros como respuesta
    res.json(registros);
  } catch (error) {
    // Maneja cualquier error que ocurra durante la obtención de los registros
    //console.log(error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
});

module.exports = router;
