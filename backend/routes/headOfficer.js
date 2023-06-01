const route = require("express").Router();
const headOfficerController = require("../controller/headOfficer");

route.post(
  "/headOfficer/createPoliceMan",
  headOfficerController.createPoliceMan
);
route.get("/getPoliceMenList", headOfficerController.policeMenList);
route.post("/assignFirToPoliceMen", headOfficerController.assignFirToPoliceMen);
route.post("/approvedFir", headOfficerController.approvedFir);
route.post(
  "/policeMenUpdateStatus",
  headOfficerController.policeMenUpdateStatus
);
module.exports = route;