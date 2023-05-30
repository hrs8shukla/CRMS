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
  getFirsByPoliceMenId: function (req, res) {
    var policeMenId = req.params.id;
    // console.log(req.para)
    console.log(policeMenId);
    Fir.find({ policeMenId: policeMenId })
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: "internal server error" });
      });
  },
  getFirById: async (req, res) => {
    try {
      var firId = req.params.id;
      var result = await Fir.findById({ _id: firId });
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: "pls try later server error" });
    }
  },
  updateFirStatus: async (req, res) => {
    try {
      var updatedStatus = req.body.status;
      var firId = req.body.id;
      var isUpdated = await Fir.updateOne(
        { _id: firId },
        { status: updatedStatus }
      );
      console.log(isUpdated);
      return res.status(200).send({ message: "status updated" });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: "pls try later server error" });
    }
  },
};
