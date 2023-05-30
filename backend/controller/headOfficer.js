const User = require("../models/user");
var bcrypt = require("bcryptjs");
// const generateToken = require("../service/commonService").generateToken;
var hashPassword = require("../service/commonService").hashPassword;
var FirModel = require("../models/fir");

module.exports = {
  createPoliceMan: async (req, res) => {
    try {
      console.log(req.body);
      const {
        aadharNo,
        email,
        firstName,
        password,
        reEnterPassword,
        lastName,
      } = req.body;
      if (!aadharNo || !email || !password || !firstName || !lastName) {
        return res.status(401).json({ message: "plz fill all fields" });
      } else {
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
          console.log("user exist");
          return res.status(409).json({ alert: "user exist already" });
        } else {
          const newUser = new User({
            aadharNo,
            email,
            firstName,
            lastName,
            password,
            userType: "policeMen",
          });
          newUser.password = await hashPassword(newUser.password);

          const status = await newUser.save();
          if (status) {
            console.log(status);
            status.password = password;
            sendMail(status);
            return res
              .status(200)
              .json({ message: "PoliceMan Added successfully", status: 200 });
          } else {
            return res.status(500).json({ server: "try later" });
          }
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "internal server error" });
    }
  },
  assignFirToPoliceMen: (req, res) => {
    console.log(req.params);
    var firId = req.body.firId;
    var policeMenFir = req.body.policeMenId;

    FirModel.findOne({ _id: firId })
      .then(async (fir) => {
        try {
          fir.policeMenId = policeMenFir;
          await fir.save();
          return res.status(200).send({ message: "assign successfully" });
        } catch (err) {
          console.log(err);
          return res.status(400).send({ message: "error while assigning fir" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: "internal server error" });
      });
  },
  policeMenList: async (req, res) => {
    try {
      var list = await User.find({ userType: "policeMen" });
      return res.send(list);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: "pls try later" });
    }
  },
};
