const Fir = require("../models/fir");

module.exports = {
  firRegister: async (req, res) => {
    console.log(req.body);
    var body = req.body;

    var fir = new Fir({
      userId: body.userId,
      beatNo: body.beatNo,
      "complaintUser.address": body.complainantAddress,
      "complaintUser.dob": body.complainantDateOfBirth,
      "complaintUser.name": body.complainantName,
      "complaintUser.aadharNo": body.complainantAadharNo,
      "complaintUser.nationality": body.complainantNationality,
      "complaintUser.occupation": body.complainantOccupation,
      "crimeDetails.crime": body.detailsOfCrime,
      "crimeDetails.suspected": body.detailsOfSuspected,
      "crimeDetails.district": body.crimeDistrict,
      "crimeDetails.date": body.occurenceDate,
      "crimeDetails.time": body.occurenceTime,
      "crimeDetails.day": body.occurenceDay,
      "crimeDetails.state": body.crimeState,
      "crimeDetails.address": body.complainantAddress,
      "crimeDetails.colony": body.crimeColony,
      "crimeDetails.pinCode": body.crimePinCode,
    });

    fir
      .save()
      .then(function (result) {
        return res.send({ message: "fir created" });
      })
      .catch(function (err) {
        console.log(err);
        return res.status(401).send({ message: "error" });
      });
  },
  getFirs: function (req, res) {
    Fir.find({})
      .then((result) => {
        return res.send(result);
      })
      .catch((err) => {
        return res.status(500).send({ message: "internal server error" });
      });
  },
};
