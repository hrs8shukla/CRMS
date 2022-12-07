const route = require("express").Router();
const userController = require("../controller/user");
// const auth = require("../middleware/auth");


route.post("/AdminSignUP", userController.AdminSignUP);
route.post("/AdminLogin",userController.AdminLogin);

module.exports=route;