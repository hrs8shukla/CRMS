var UserModel = require("../models/user.js");
var hashPassword = require("../service/commonService").hashPassword;
var sendMail = require("./mailService").sendAccountActivateMailHandler;

module.exports = {
  createAdmin: async () => {
    try {
      UserModel.findOne({ userType: "headOfficer" })
        .then(async (result) => {
          if (!result) {
            var admin = new UserModel({
              firstName: "sparsh",
              lastName: "mittal",
              password: "Admin1",
              aadharNo: "201035658701",
              email: "15as1911059@gmail.com",
              userType: "headOfficer",
            });

            admin.password = await hashPassword(admin.password);

            admin
              .save()
              .then(function (result) {
                result.password = "Admin1";
                console.log(result);
                sendMail(result);
              })
              .catch(function (err) {
                console.log(err);
              });
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },
};
