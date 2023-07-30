const { sequelize } = require("../../db")

const reverseDeleteClient = async (id) => {
    const dbProf = await sequelize.query(
        `UPDATE "Clients" set "softDelete"=null where id='${id}';`//Cuando la propiedad softDelete esta en true quiere decir que no se mostrara dentro de los Clientes, se elimina logicamente, lo cual quiere decir que no se podra ver en el Front dentro de los clientes pero seguira estando disponible en la base de datos
    );

    if (dbProf.length === 0) {
        throw Error("El id del cliente solicitado, no fue encontrado.")
    }
    return "El cliente fue restaurado exitosamente."
}

module.exports = reverseDeleteClient;