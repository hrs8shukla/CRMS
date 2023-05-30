const route = require("express").Router();
const firController = require("../controller/fir");

route.post("/firRegister", firController.firRegister);
route.get("/getFirs", firController.getFirs);
route.get("/getFirById/:id", firController.getFirById);
route.get("/getFirsByPoliceMenId/:id", firController.getFirsByPoliceMenId);
route.put("/updateFirStatus", firController.updateFirStatus);

// route.post("/AdminLogIn", userController.signIn);

module.exports = route;
