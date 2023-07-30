const { Router } = require('express');

// Aqui se importan los routers para las diferentes rutas:

const clientRouter = require('./clientRoutes');

const ocupationsRouter = require('./ocupationsRoutes');
const ocupationspRouter = require('./ocupationspRouter')
const profesionalRouter = require('./profesionalRouter');
const pasarelaRouter = require('../pasarelapagos/routes/pasarelaRouter')
const categoryRouter = require('./categoryRoutes');
const reviewRouter = require("./reviewRoutes");
const registerRouter = require('./registerRoutes');
const loginRouter = require('./loginRoutes');
const postProfesional = require("./postProfesionalRoutes");
const postProfesionalb = require("./postProfesionalbRoutes");
const countryRouter = require('./countryRoutes');
const locationRouter = require('./locationRoutes');
const loginGoogleRouter=require('./googleRoutes');
const premiumRouter = require('../pasarelapagos/routes/premiumRouter');
const contactRouter = require('./contactRoutes');
const insertFile=require('./insertFile');
const getFile= require('./getFile');
// Router: 

const router = Router();

// Enrutado:
router.use('/premium', premiumRouter); // Clientes 

router.use('/cash', pasarelaRouter); // Clientes 

router.use('/client', clientRouter); // Clientes 

router.use('/profesional', profesionalRouter); //Proveedores

router.use('/category', categoryRouter); //Categorias

router.use('/ocupations', ocupationsRouter); // Ocupaciones

router.use('/ocupationsp', ocupationspRouter); // profesionales por Ocupacion

router.use("/review", reviewRouter); // Posts del cliente

router.use("/postProfesional", postProfesional) // Post del profesional

router.use("/postProfesionalb", postProfesionalb) // Post del profesional

router.use('/register', registerRouter); // register

router.use('/login', loginRouter); //login

router.use('/country', countryRouter); // Country

router.use('/location',locationRouter);

router.use('/auth/google', loginGoogleRouter) //google

router.use('/image', insertFile)//insertar documentos a un profesional

router.use('/file', getFile)//obtener los documentos de un profesional


router.use('/relation',contactRouter); // ClientProfesionalRelation










// Esto es para mande un error en caso de que le peguen a una ruta que no hemos desarrollado -> http://localhost:3001/profesional-categories
router.use((req, res, next) => {
  const error = new Error(`La ruta ${req.originalUrl} con el método ${req.method} no está implementada`);
  error.status = 404;
  next(error);
});

// Middleware de manejo de errores
router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || 'Error interno del servidor'
  });
});

module.exports = router;