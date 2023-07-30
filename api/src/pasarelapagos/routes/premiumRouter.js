const { Router } = require('express');


const premiumHandler = require('../handler/premiumhandler');

const premiumRouter = Router();

premiumRouter.post('/', premiumHandler);

module.exports = premiumRouter;
