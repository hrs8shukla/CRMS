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
const generateToken = (id, userType) => {
  const token = jwt.sign({ id, userType }, process.env.SECRET_KEY);
  return token;
};
module.exports = { hashPassword, generateToken };
