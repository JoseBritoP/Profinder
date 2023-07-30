const { Premium, Profesional } = require('..//..//db');
const { sendEmailPremium } = require("../../configs/nodemailer/sendEmailConfirmation")

async function updatePremiumStatus(req, res, next) {
  try {
    // Obtén los datos del cuerpo de la solicitud POST
    const { collectionStatus, preferenceId } = req.body;
      // Verifica que collectionStatus sea "approved"
    if (collectionStatus !== 'approved') {
      return res.status(404).json({ error: 'El estado de colección no es aprobado.' });
    }

    // Busca el modelo Premium asociado al preferenceId
    const premium = await Premium.findOne({
      where: { preferenceId: preferenceId },
    });

    if (!premium) {
      throw new Error('El preferenciaId no fue encontrada.');
    }

    // Actualiza el estado active a true en el modelo Premium
    premium.active = true;
    await premium.save();

    // Busca el modelo Profesional asociado al ProfesionalId de la tabla Premium
    const profesional = await Profesional.findOne({
      where: { id: premium.ProfesionalId },
    });

    if (profesional) {
      // Actualiza el estado active a true en el modelo Profesional
      profesional.active = true;
      await profesional.save();
      await sendEmailPremium(profesional.email, profesional.name)
    }

    // Responde con una respuesta de éxito
    res.status(200).json({ message: 'Estas suscrito a Premium.' });
  } catch (error) {
    res.status(404).json(error.message)
    next(error);
  }
}

module.exports = {
  updatePremiumStatus,
};
