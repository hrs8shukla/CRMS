const User = require("../models/user");
var bcrypt = require("bcryptjs");
const generateToken = require("../service/commonService").generateToken;
var hashPassword = require("../service/commonService").hashPassword;

module.exports = {
  signUp: async (req, res) => {
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
          });
          newUser.password = await hashPassword(newUser.password);
          const status = await newUser.save();
          if (status) {
            console.log(status);
            return res
              .status(200)
              .json({ message: "user Register successfully", status: 200 });
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
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({ message: "please fill all fields" });
      } else {
        const user = await User.findOne({ email });
        if (user) {
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) {
            const token = await generateToken(user._id, user.userType);

            return res
              .status(200)
              .json({ message: "user login successfully", token, user });
          } else {
            return res.status(401).json({ message: "wrong credentials" });
          }
        } else {
          return res
            .status(404)
            .json({ message: "user not found", status: 404 });
        }
      }
    } catch (err) {
      console.log("login issue", err);
    }
  },
};

// {
//   "message": "user login successfully",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzU3YTc5M2E5MGFhMjJmYjMxYWVlOSIsInVzZXJUeXBlIjoiY2l0aXplbiIsImlhdCI6MTY4MTIyNjU1Nn0.iCafEi0vJSj91QDybJat_By12iyKgsuILeAPzTkF_qg"
// }
