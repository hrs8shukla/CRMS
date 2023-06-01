const route = require("express").Router();
const userController = require("../controller/user");

route.post("/AdminSignUP", userController.signUp);
route.post("/AdminLogIn", userController.signIn);
route.post("/getUsersFir", userController.getUsersFir);

module.exports = route;