const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema({
    name: String,
    userid: String,
    email:String,
    password: String,
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
})

module.exports  =  mongoose.model("User", userSchema)