const bcrypt = require("bcrypt");

const { sendEmailRestartPassword } = require("../configs/nodemailer/sendEmailConfirmation");

const { User } = require("../db");

const typeUserPassword = require("../controllers/loginController/changePasswordByUser");

const { sequelize } = require("../db");




const loginUser = async (req, res) => {

  const { usuario, email, password } = req.body;

  const { forgotPassword } = req.query

  if (forgotPassword) {

    const sql = await sequelize.query(
      `SELECT * FROM "Users" where email= '${forgotPassword}'`
    );

    if (sql[0][0]) {
      await sendEmailRestartPassword(forgotPassword, sql[0][0].name)
      return res.status(200).json({ message: "Correo enviado con éxito" })
    }
    else {
      return res.status(404).json({ message: "El correo solicitado, no existe" })
    }

  }
  const sql = await sequelize.query(
    `SELECT * FROM "Users" where email= '${email}'`
  );

  if (!sql[0].length) {
    res.status(400).json({ message: "El email no ha sido encontrado" });
  }

  if (sql[0][0]) {
    bcrypt.compare(password, sql[0][0].password, (error, resultado) => {
      if (error) throw error;
      if (resultado) {
        typeUser();
        if (!res.status(400)) {
          res.status(200).json({
            usuario: usuario,
            email: email,
            password: password,
            message: "Usuario logueado satisfactoriamente",
          });
        }
      } else {
        res.status(401).json({ message: "La contraseña es inválida" });
      }
    });
  }

  const typeUser = async () => {
    switch (usuario) {
      case "c":
        const loginClient = await sequelize.query(
          `SELECT * FROM "Clients" WHERE "email"= '${email}'`
        );

        if (loginClient[0][0].softDelete === true) {
          res.status(403).json({ message: "Lo sentimos, pero estas baneado en la app." })
          break;
        }
        if (loginClient[0][0] == undefined) {
          res.status(400).json({
            usuario: usuario,
            email: email,
            password: password,
            message: "No pertenece al tipo de usuario seleccionado",
          });

          break;
        } else {
          res.status(200).json({
            id: loginClient[0][0].id,
            usuario: usuario,
            email: email,
            password: password,
            message: "Usuario logueado satisfactoriamente",
          });
          break;
        }

      case "p":
        const loginProf = await sequelize.query(
          `SELECT * FROM "Profesionals" WHERE "email"= '${email}'`
        );
        if (loginProf[0][0].softDelete === true) {
          res.status(403).json({ message: "Lo sentimos, pero estas baneado en la app." })
          break;
        }
        if (loginProf[0][0] == undefined) {
          res.status(200).json({
            usuario: usuario,
            email: email,
            password: password,
            message: "No pertenece al tipo de usuario seleccionado",
          });

          break;
        } else {
          res.status(200).json({
            id: loginProf[0][0].id,
            usuario: usuario,
            email: email,
            password: password,
            message: "Usuario logueado satisfactoriamente",
          });
          break;
        }

      case "a":
        const adminis = await sequelize.query(`SELECT * FROM "Users" WHERE "email"= '${email}'`);
        if (adminis[0][0] == undefined) {
          res.status(200).json({
            usuario: usuario,
            email: email,
            password: password,
            message: "El correo ingresado no corresponde al administrador",
          });

          break;

        } else {
          res.status(200).json({
            id: adminis[0][0].id,
            usuario: usuario,
            email: email,
            password: password,
            message: "Administrador logueado satisfactoriamente",
          });
          break;
        };


      default:
        break;
    }
  };
};





const updatePassword = async (email, password) => {

  bcrypt.hash(password, 8, async (error, hash) => {

    if (error) { throw Error(error.message) };

    const user = await sequelize.query(`UPDATE "Users" SET password= '${hash}'WHERE "email"= '${email}'`)

    return user
  })
};



const changePasswordLogin = async (req, res) => {

  const { email, password } = req.body;

  const usuario = await User.findOne({
    where: {
      email: email
    }
  })
  try {
    await updatePassword(email, password);

    const changePasswordByUser = await typeUserPassword(email, password, usuario.usuario)

    return res.status(200).json(changePasswordByUser);

  } catch (error) {

    return res.status(404).json({ error: error.message });
  }
}




module.exports = { loginUser, changePasswordLogin };
