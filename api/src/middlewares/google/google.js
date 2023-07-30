const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const {sequelize} = require("../../db");

const {config}= require('dotenv');

config();




const allEmails= async()=>{

  const allemails= await sequelize.query('SELECT email FROM "Users" ');

  const emailsdb=[];
  
  for (var i = 0; i < allemails[0].length; i++){

    const newEmail= allemails[0][i].email;

    emailsdb.push(newEmail);

  } return (emailsdb)

};



const loginUserGoogle= async (emailFromGoogle) =>{

  const email = emailFromGoogle;

  const sql= await sequelize.query(`SELECT * FROM "Users" where email= '${email}'`)

  return (sql[0][0].usuario)

};




const tableClient= async (usuario,emailFromGoogle)=>{

  const email = emailFromGoogle;

  const loginClient= await sequelize.query(`SELECT * FROM "Clients" WHERE "email"= '${email}'`)

  return loginClient[0][0].id
};



const tableProf= async (usuario,emailFromGoogle)=>{

  const email = emailFromGoogle;

  const loginProf= await sequelize.query(`SELECT * FROM "Profesionals" WHERE "email"= '${email}'`);

  return (loginProf[0][0].id)

};


const tableAdmi= async (usuario,emailFromGoogle)=>{

  const email = emailFromGoogle;

  const adminis = await sequelize.query(`SELECT * FROM "Users" WHERE "email"= '${email}'`);

  return (adminis[0][0].id)

};


const execute= async (accessToken, refreshToken, profile, done) =>{

  const emails= await allEmails();

  const response= emails.includes(profile.emails[0].value);

  if (response){

      const emailFromGoogle= profile.emails[0].value;

      const usuario= await loginUserGoogle(emailFromGoogle);

      
      if (usuario=="c"){
        const id=  await tableClient(usuario,emailFromGoogle);
        const userData={
          usuario:usuario,
          id: id
        };
        done(null,userData);


      }else if (usuario=="p"){
        const id=  await tableProf(usuario,emailFromGoogle);
        const userData={
          usuario:usuario,
          id: id
        };
        done(null,userData);

      } else if (usuario=="a"){
        const id=  await tableAdmi(usuario,emailFromGoogle);
        const userData={
          usuario:usuario,
          id: id
        };
    
        done(null,userData);
      }

  } else { 
    done(null,'El correo electrónico seleccionado no se encuentra registrado. Será redirigido para realizar su registro')
  }
};
   


const authgoogle =new GoogleStrategy ({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google"
  }, execute)



module.exports= authgoogle


