const { Router } = require("express");

const { loginUser,changePasswordLogin} = require("../handlers/loginHandler");

const putValidate = require("../middlewares/users/putValidate")




const loginRouter = Router();


loginRouter.post("/", loginUser);

loginRouter.put("/", putValidate, changePasswordLogin);




module.exports = loginRouter; 
