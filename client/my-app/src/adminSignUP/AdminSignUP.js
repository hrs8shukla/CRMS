import React, { useState } from "react";
import "./SignUpStyle.css";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";

export default function AdminSignUP() {
  const chk_exp = /^\d{12}$/;

  const history = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    aadharNo: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // const { name, value } = e.target
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const verifyAadharHandler = async () =>{
    const response = await fetch(
      `https://l669o4p4p3.execute-api.us-east-1.amazonaws.com/dev/number?number=${user.aadharNo}`
    );
    console.log(response);
      const res = await response.json();
      console.log(res);
    // axios.post(
    //   `https://l669o4p4p3.execute-api.us-east-1.amazonaws.com/dev/number?number=${user.aadharNo}`
    // ).then(res=>{
    //   console.log(res);
    // }).catch(err=>console.log(err));
  } 

  const AdminSignUP = () => {
    console.log(user);
    const { firstName, lastName, email, password, aadharNo } = user;

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      chk_exp.test(aadharNo) &&
      password
    ) {
      // history("/AdminLogin");
      axios
        .post("http://localhost:9002/AdminSignUP", user)
        .then((res) => {
          alert(res.data.message);
          history("/AdminLogin");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("invalid input");
    }
  };

  // let url="../adminLogin/AdminLogin";

  return (
    <>
      <div className="signup-super-container">
        <Navbar />
        <div className="signup-container">
          <form id="form" className="signup-form">
            <a href="/AdminSignUP" className="signup-sign" id="sign-id">
              <h2>SIGN UP!</h2>
            </a>
            <a href="/AdminLogin" className="signup-log" id="log-id">
              <h2>LOGIN!</h2>
            </a>
            <hr className="signup-center-ball" />
            <div className="signup-form-control signup-form-control">
              <label for="Name">First Name</label>
              <input
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                type="text"
                id="name"
                placeholder="Enter your first name"
              />
              <small>Error message</small>
            </div>
            <div className="signup-form-control signup-form-control">
              <label for="Name">Last Name</label>
              <input
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                type="text"
                id="name"
                placeholder="Enter your first name"
              />
              <small>Error message</small>
            </div>
            <div className="form-control signup-form-control">
              <label for="username">Aadhar Card No</label>
              <input
                name="aadharNo"
                value={user.aadharNo}
                onChange={handleChange}
                type="text"
                id="userid"
                placeholder="Enter aadhar no"
              />
              <small>Error message</small>
            </div>
            <div className="button" onClick={verifyAadharHandler}>
              Verify Aadhar
            </div>
            <div className="form-control signup-form-control">
              <label for="email">Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                type="text"
                id="email"
                placeholder="Enter email"
              />
              <small>Error message</small>
            </div>
            <div className="form-control signup-form-control">
              <label for="password">Password</label>
              <input
                name="password"
                value={user.password}
                onChange={handleChange}
                type="password"
                id="password"
                placeholder="Enter password"
              />
              <small>Error message</small>
            </div>

            {/*  <button type="submit" onClick={AdminSignUP}>SIGN UP</button>*/}
            <div className="button" onClick={AdminSignUP}>
              SIGN UP
            </div>
          </form>
        </div>
      </div>
      <div class="align-items-center ">
        <p class="mb-0">
          &copy; 2022 - 2023 | All Rights Reserved
          <a href="#" class="text-copy">
            Privacy Policy
          </a>{" "}
          |
          <a href="#" class="text-term">
            Terms of Use
          </a>
        </p>
      </div>
    </>
  );
}
