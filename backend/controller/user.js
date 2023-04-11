const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (err) {
    console.log("hash func", err);
  }
};

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY);
  return token;
};

module.exports = {
  signUp: async (req, res) => {
    try {
      console.log(req.body);
      const {
        userName,
        email,
        firstName,
        password,
        reEnterPassword,
        lastName,
      } = req.body;
      if (
        !userName ||
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !reEnterPassword
      ) {
        return res.status(401).json({ message: "plz fill all fields" });
      } else if (password != reEnterPassword) {
        return res.status(401).json({ message: "password not matching" });
      } else {
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
          console.log("user exist");
          return res.status(409).json({ alert: "user exist already" });
        } else {
          const newUser = new User({
            userName,
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
      const { userName, email, password } = req.body;

      //   const user = await User.findOne({ userid });
      //   if (user) {
      //     const isPasswordMatch = await bcrypt.compare(password, user.password);
      //     if (isPasswordMatch) {
      //       const token = await generateToken(user._id);
      //       user.tokens = user.tokens.concat({ token });
      //       const userTokenSave = await user.save();
      //       if (userTokenSave) {
      //         res.cookie("user_token", token, {
      //           expires: new Date(Date.now() + 25892000000),
      //           httpOnly: true,
      //         });
      //         return res
      //           .status(200)
      //           .json({ message: "user login successfully", user });
      //       } else {
      //         return res.status(500).json({ message: "server error" });
      //       }
      //     } else {
      //       return res.status(400).json({ message: "wrong credentials" });
      //     }
      //   }
    } catch (err) {
      console.log("login issue", err);
    }
  },
};
