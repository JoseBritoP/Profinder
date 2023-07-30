const {  updatePremiumStatus } = require('../controllers/premiumController');

function premiumHandler(req, res, next) {
  // Aquí puedes añadir cualquier validación o lógica adicional antes de llamar al controlador
  updatePremiumStatus(req, res, next);
}

module.exports = premiumHandler;
