import React from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate= useNavigate();
  const logoutStyle = {
    display:'block',
    backgroundColor:'#fff',
    color: 'black',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    margin: '0 20px',
    padding:'5px 10px',
    borderRadius: '5px',
    cursor:'pointer'
  }
  const handleLogout = () =>{
    localStorage.removeItem('isLogged');
    navigate("/AdminLogin");
  }
  const userId = localStorage.getItem("userId");
  const handlenavigate = ()=>{
    navigate("/policeofficer", { state: userId });
  }

  return (
    <>
      <nav
        className="navbar background h-nav-resp"
        style={{ marginBottom: "0" }}
      >
        <div className="logo">
          <img src="/juslogo1.png" alt="logo" />
          <span class="crms-text">CRMS</span>
        </div>
        <input type="checkbox" id="check" />
        <label for="check" class="checkbtn">
          <i class="fas fa-bars"></i>
        </label>
        <ul className="nav-list v-class-resp">
          <li >
            <div onClick={handlenavigate}><a>Total FIRs</a></div>
          </li>
        </ul>
       
        <div style={logoutStyle} onClick={handleLogout}>
        <a>Logout</a>
        </div>
      </nav>
    </>
  );
}
