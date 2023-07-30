// Dependencias:

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


//Para mensaje flash e inicios de sesion:
const flash = require('connect-flash');
const passport= require ('passport')


// Router

const mainRouter = require('./routes/index');
const authgoogle= require ('../src/middlewares/google/google')
const loginGoogleRouter = require('./routes/googleRoutes.js');

// Server

const server = express();

//Subir imagenes 
const path= require('path');
const fs= require ('fs');
const multer = require ('multer');
const upload = multer({dest: 'public'})

// recuperacion de las sesiones, para evitar vulnerabilidades
server.use(cors());


server.use(flash())

server.set('views',path.join(__dirname,))

server.set('view engine', 'pug')

server.use(morgan('dev'));

server.use(express.json());

server.use(express.urlencoded({extended:false}));

server.use(express.static(path.join(__dirname,'public')))

server.use(passport.initialize());

server.use('/auth',  passport.authenticate(authgoogle,{
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
session: false,
}), loginGoogleRouter);


// Conexión a las rutas:
server.use('/', mainRouter)


module.exports = server;
