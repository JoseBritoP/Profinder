const { Router } = require('express');

// Handlers 

const {getContacts,getContact,postContact,putContact}= require('../handlers/contactHandlers');

// Middlewares

// 

// Router

const contactRouter = Router();

// Enrutado

contactRouter.get('/',getContacts);
contactRouter.get('/:id',getContact);
contactRouter.post('/:id',postContact);
contactRouter.put('/:id',putContact);

module.exports = contactRouter;