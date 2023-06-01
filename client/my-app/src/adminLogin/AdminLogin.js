import React, { useState } from "react";
import "./logStyle.css";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Adminlogin({ setLoginUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLogIn, setIsLogIn] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const AdminLogin = () => {
    axios
      .post("http://localhost:9002/AdminLogin", user)
      .then((res) => {
        console.log(res);
        const userId = {
          userId: res.data.user._id,
          userType: res.data.user.userType,
         
        };
        const policeUser = {
          userId: res.data.user._id,
          userType: res.data.user.userType,
          userDetail: res.data.user
        }
        localStorage.setItem("isLogged",true);
        localStorage.setItem("userId", res.data.user._id)
        if (userId.userType === "citizen")
          navigate("/FIRForm", { state: userId });
          else if(userId.userType=== "headOfficer")
          navigate("/superadmin");
          else if(userId.userType=== "policeMen"){
            localStorage.setItem("userId",userId);
            navigate("/policeofficer", { state: policeUser });
          }

        else navigate("/policeFirDetails");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Invalid Credentials`,{
          position:"top-center",
          autoClose:3000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress: undefined,
          theme:"light",
          containerStyle: { width: '500px' }
        });
      });

    // navigate("/FIRForm",{state : user});
    //  axios.post("http://localhost:9002/AdminLogin", user)
    //  .then(res => {
    //      alert(res.data.message)
    //    //  setLoginUser(res.data.user)
    //      navigate("/FIRForm")
    //  })
  };

  return (
    <>
      <Navbar isLogIn={isLogIn} />
      <div className="login-super-container">
      <div className="log-container ">
        <form id="form" className="log-form">
          <a href="/AdminSignUP" className="log-sign">
            <h2>SIGN UP!</h2>
          </a>
          <a href="/AdminLogin" className="log-log">
            <h2>LOGIN!</h2>
          </a>
          <hr className="log-center-ball" />
          <div className="log-form-control form-control">
            <label for="username">Email ID</label>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              type="text"
              id="userid"
              placeholder="Enter email id"
            />
            <small>Error message</small>
          </div>
          <div className="log-form-control form-control">
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
          {/* <button type="submit" onClick = {AdminLogin}>LOGIN</button> */}
          <div className="button" onClick={AdminLogin}>
            LOGIN
          </div>
          <a href="/ForgetPassOTP" className="log-forg-pass">
            <p>Forgot Password ?</p>
          </a>
        </form>
      </div>
    </div>
      <div class="align-items-center ">
        <p class="mb-0">
          &copy; 2022 - 2023 | All Rights Reserved - Pallavi Kumari
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
