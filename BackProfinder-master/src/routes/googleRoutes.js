const { Router } = require('express');

const loginGoogleRouter = Router();

loginGoogleRouter.get('/', function (req,res){ res.send(req.user)});


module.exports = loginGoogleRouter;