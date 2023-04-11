const Fir = require("../models/fir");

module.exports = {
  firRegister: async (req, res) => {
    console.log(req.body);
    var body = req.body;

    var fir = new Fir({
      userId: body.userId,
      beatNo: body.beatNo,
      "complaintUser.address": body,
      "complaintUser.dob": body,
      "complaintUser.name": body,
      "complaintUser.aadharNo": body,
      "complaintUser.nationality": body,
      "complaintUser.occupation": body,
      "crimeDetails.crime": body,
      "crimeDetails.suspected": body,
      "crimeDetails.district": body,
      "crimeDetails.date": body,
      "crimeDetails.time": body,
      "crimeDetails.day": body,
      "crimeDetails.state": body,
      "crimeDetails.address": body,
    });

    console.log(fir);
  },
};
