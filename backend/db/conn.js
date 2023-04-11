const mongoose = require("mongoose");
const DB = process.env.DATABASE;
var createAdmin = require("../service/createHeadOfficer").createAdmin;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connected");
    createAdmin();
  })
  .catch((err) => {
    console.log(err);
    console.log("mongoo connection failed");
  });
