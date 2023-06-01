import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Superadmin.css";
import axios from "axios";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
//aadharNo, firstName, lastName, email,password

const Superadmin = () => {
  const chk_exp = /^\d{12}$/;
  const [policeData, setPoliceData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    aadharNo: "",
    district: "",

    state: "",
    pincode: "",
    address: "",
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
    const {
      firstName,
      lastName,
      email,
      password,
      aadharNo,
      district,
      state,
      pincode,
      address,
    } = policeData;

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      chk_exp.test(aadharNo) &&
      address &&
      pincode &&
      state &&
      district
    ) {
      axios
        .post("http://localhost:9002/headOfficer/createPoliceMan", policeData)
        .then((res) => {
          toast.success(`Created Policeman successfully`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerStyle: { width: "500px" },
          });
          console.log(res);
          setPoliceData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            aadharNo: "",
            district: "",
            state: "",
            pincode: "",
            address: "",
          });
        })
        .catch((err) => {
          toast.error(`Server error.Try again!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerStyle: { width: "500px" },
          });
          console.log(err);
        });
    } else {
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
          style={{ marginBottom: "10px", marginRight: "10px" }}
        />
        <br />
        <TextField
          onChange={handleInput}
          name="district"
          id="outlined-basic"
          label="District"
          variant="outlined"
          className="textField"
          style={{ marginBottom: "10px", marginRight: "10px" }}
        />
        <TextField
          onChange={handleInput}
          name="pincode"
          id="outlined-basic"
          label="Pincode"
          variant="outlined"
          className="textField"
          style={{ marginBottom: "10px", marginRight: "10px" }}
        />
        <br />
        <TextField
          onChange={handleInput}
          name="address"
          id="outlined-basic"
          label="Address"
          variant="outlined"
          className="textField"
          style={{ marginBottom: "10px", marginRight: "10px" }}
        />
        <TextField
          onChange={handleInput}
          name="state"
          id="outlined-basic"
          label="State"
          variant="outlined"
          className="textField"
          style={{ marginBottom: "10px", marginRight: "10px" }}
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
          style={{ marginBottom: "10px", width: "200px" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Create Policeman
        </Button>
      </div>
    </>
  );
};

export default Superadmin;
