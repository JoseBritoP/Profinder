const bcrypt = require("bcrypt");
const { sequelize } = require("../../db");


const typeUserPassword = async (email, password, usuario) => {
    //console.log(password);
    switch (usuario) {
        case "c":
            const updatePasswordClient = await sequelize.query(
                `SELECT * FROM "Clients" WHERE "email"= '${email}'`
            );

            if (updatePasswordClient[0][0] === undefined) {
                throw Error({
                    usuario: usuario,
                    email: email,
                    password: password,
                    message: "No pertenece al tipo de usuario seleccionado"
                }
                );

            } else {
                const hash = await bcrypt.hash(password, 8);
                await sequelize.query(
                    `UPDATE "Clients" SET password = '${hash}' WHERE id = ${updatePasswordClient[0][0].id}`
                );
                return {
                    id: updatePasswordClient[0][0].id,
                    usuario: usuario,
                    email: email,
                    password: hash,
                    message: "Contraseña restablecida",
                };
            }


        case "p":
            const updatePasswordProfesional = await sequelize.query(
                `SELECT * FROM "Profesionals" WHERE "email"= '${email}'`
            );

            if (updatePasswordProfesional[0][0] == undefined) {
                throw Error({
                    usuario: usuario,
                    email: email,
                    password: password,
                    message: "No pertenece al tipo de usuario seleccionado"
                }
                );

            } else {
                const hash = await bcrypt.hash(password, 8);
                await sequelize.query(
                    `UPDATE "Profesionals" SET password = '${hash}' WHERE id = ${updatePasswordProfesional[0][0].id}`
                );
                return {
                    id: updatePasswordProfesional[0][0].id,
                    usuario: usuario,
                    email: email,
                    password: hash,
                    message: "Contraseña restablecida",
                };
            }

        case "a":

            const adminis = await sequelize.query(`SELECT * FROM "Users" WHERE "email"= '${email}'`);
            if (adminis[0][0] == undefined) {
                throw Error({
                    usuario: usuario,
                    email: email,
                    password: password,
                    message: "El correo ingresado no corresponde al administrador",
                });

            } else {
                const hash = await bcrypt.hash(password, 8);
                return {
                    id: adminis[0][0].id,
                    usuario: usuario,
                    email: email,
                    password: hash,
                    message: "Contraseña de administrador restablecida",
                };
            };


        default:
            break;
    }
};

module.exports = typeUserPassword