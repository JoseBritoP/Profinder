const mercadopago = require('mercadopago');
const { Profesional, Premium } = require('../../db');

const { API_KEY_PASA } = process.env;

mercadopago.configure({
  access_token: `${API_KEY_PASA}`,
});

async function crearPreferencia(req, res, next) {
  try {
    const { description, price, quantity, ProfesionalId } = req.body;

    const profesional = await Profesional.findOne({ 
      where: { id: ProfesionalId }, 
    });
    

    if (!profesional) {
      throw new Error('El ProfesionalId proporcionado no es válido.');
    }

    // Crea la orden en la base de datos Premium
    const nuevaOrden = await Premium.create({
      description: description,
      price: price,
      quantity: quantity,
      ProfesionalId: ProfesionalId,
    });

    const idCompra = nuevaOrden.getDataValue('idCompra');
    // Crea la preferencia de pago
    let preference = {
     metadata: { id_shop: idCompra },
      notification_url: 'https://profinder-client.vercel.app/',
      items: [
        {
          description: description,
          unit_price: Number(price),
          quantity: Number(quantity),
          ProfesionalId: Number(ProfesionalId),
        },
       ], back_urls : {
          success: `https://profinder-client.vercel.app/dashboardSuppliers`,
          failure: 'https://profinder-client.vercel.app/pasarela',
          pending: '',
        }, 
        auto_return: 'approved',
        
      
    };

    // Crea la preferencia de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
      
    // Actualiza el estado de la fila "Premium" con la información de la preferencia de pago
    await Premium.update(
      { preferenceId },
      { where: { idCompra } }, // Utilizamos el campo "idCompra" 
    );
 
    // Devuelve la respuesta con o sin el preferenciaId, según corresponda
    if (preferenceId) {
      res.status(200).json({ preferenceId, idCompra});
    } else {
      res.status(200).json({ idCompra });
    }
  } catch(error) {
    res.status(404).json(error.message)
    next(error.message);
  }
}

module.exports = {
  crearPreferencia,
};

