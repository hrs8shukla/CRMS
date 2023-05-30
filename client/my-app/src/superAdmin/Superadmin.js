import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Superadmin.css";
import axios from "axios";
import Navbar from "./Navbar";
//aadharNo, firstName, lastName, email,password

const Superadmin = () => {
  const chk_exp = /^\d{12}$/;
  const [policeData, setPoliceData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    aadharNo: "",
  });
  const [isAadharVerified, setIsAadharVerified] = useState(false);
  const handleInput = (e) => {
    setPoliceData({
      ...policeData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAadharClick = async () => {
    const response = await fetch(
      `https://l669o4p4p3.execute-api.us-east-1.amazonaws.com/dev/number?number=${policeData.aadharNo}`
    );
    console.log(response);
    const res = await response.json();
    console.log(res);
    if (res) {
      setIsAadharVerified(true);
    } else {
      setIsAadharVerified(false);
    }
    // axios.post(
    //   `https://l669o4p4p3.execute-api.us-east-1.amazonaws.com/dev/number?number=${user.aadharNo}`
    // ).then(res=>{
    //   console.log(res);
    // }).catch(err=>console.log(err));
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, password, aadharNo } = policeData;

    if (firstName && lastName && email && password && chk_exp.test(aadharNo)) {
      axios
        .post("http://localhost:9002/AdminSignUP", policeData)
        .then((res) => {
          console.log(res);
          setPoliceData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            aadharNo: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("fill all the fields correctly!!");
    }
  };
  return (
    <>
      <Navbar />
      <div className="admin-policeinfoform-container">
        <TextField
          onChange={handleInput}
          name="firstName"
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          className="textField"
          style={{ marginBottom: "10px", marginRight: "10px" }}
        />

        <TextField
          onChange={handleInput}
          name="lastName"
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          className="textField"
          style={{ marginBottom: "10px" }}
        />
        <br />
        <TextField
          onChange={handleInput}
          name="aadharNo"
          id="outlined-basic"
          label="aadhar Number"
          variant="outlined"
          className="textField"
          style={{ marginBottom: "10px" }}
        />
        <br />
        <Button
          variant="outlined"
          style={{ marginBottom: "10px", width: "150px" }}
          onClick={handleAadharClick}
        >
          Verify
        </Button>
        <br />
        <TextField
          onChange={handleInput}
          name="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="textField"
          style={{ marginBottom: "10px" }}
        />
        <br />
        <TextField
          onChange={handleInput}
          name="password"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          style={{ marginBottom: "10px" }}
        />
        <br />
        <Button
          style={{ marginBottom: "10px", width: "150px" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Superadmin;
