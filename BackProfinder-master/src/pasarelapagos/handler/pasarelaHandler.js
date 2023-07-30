const pasarelaController = require('../controllers/pasarelaPreferenciaController');

function pasarelaHandler(req, res, next) {
  pasarelaController.crearPreferencia(req, res, next);
}

module.exports = pasarelaHandler;