const fs = require("fs")
const path = require("path")
const nodemailer = require("nodemailer");
const cheerio = require("cheerio")
const htmlToText = require('nodemailer-html-to-text').htmlToText;
require('dotenv').config();
const { google } = require("googleapis")
const { ADMIN_EMAIL, ADMIN_PASSWORD, CLIENT_ID_EMAIL, CLIENT_SECRET_EMAIL, REDIRECT_URI, REFRESH_TOKEN } = process.env
const oAuth2Client = new google.auth.OAuth2({
    CLIENT_ID_EMAIL,
    CLIENT_SECRET_EMAIL,
    REDIRECT_URI
});

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: ADMIN_EMAIL,
        pass: ADMIN_PASSWORD,
        clientId: CLIENT_ID_EMAIL,
        clientSecret: CLIENT_SECRET_EMAIL,
        refreshToken: REFRESH_TOKEN,
    }
});

const sendEmailWelcome = async (email) => {
    try {
        const dirPath = path.join(__dirname, '/WelcomeMessage/index.html');
        const htmlContent = fs.readFileSync(dirPath, "utf-8");
        transporter.use('compile', htmlToText());
        const mailOptions = {
            from: `"App Profinder" < ${ADMIN_EMAIL} >`, // sender address
            to: email, // list of receivers
            subject: "Bienvenido", // Subject line
            html: htmlContent// html body            
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
       // console.log(error);
    }

};

const sendEmailRestartPassword = async (email, name) => {
    const dirPath = path.join(__dirname, '/RestartPassword/index.html');
    const htmlContent = fs.readFileSync(dirPath, "utf-8");
    const addName = cheerio.load(htmlContent);
    addName('#titulo').text(`¡Hola ${name}!`);
    transporter.use('compile', htmlToText());
    const mailOptions = {
        from: `"App Profinder" < ${ADMIN_EMAIL} >`, // sender address
        to: email, // list of receivers
        subject: "Bienvenido", // Subject line
        html: addName.html()// html body            
    }
    await transporter.sendMail(mailOptions)

}

const sendEmailPremium = async (email,name) => {
    try {
        const dirPath = path.join(__dirname, '/PremiumMessage/index.html');
        const htmlContent = fs.readFileSync(dirPath, "utf-8");
        const editHtml = cheerio.load(htmlContent);
        editHtml('#titulo').text(`¡Gracias ${name} por tu suscripcion!`);
        editHtml('#editParrafo').text(`¡Hola ${name}!`)
        transporter.use('compile', htmlToText());
        const mailOptions = {
            from: `"App Profinder" < ${ADMIN_EMAIL} >`, // sender address
            to: email, // list of receivers
            subject: "Bienvenido", // Subject line
            html: editHtml.html()// html body            
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
       //console.log(error);
    }
}


module.exports = {
    sendEmailWelcome,
    sendEmailRestartPassword,
    sendEmailPremium
}
