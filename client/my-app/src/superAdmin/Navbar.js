import React, { useState } from "react";
import axios from "axios";


import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, FormControl, Select, MenuItem } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";

export default function Navbar() {
  const [optionSelected,setOptionSelected] = useState(null);
  const handleChange =(e)=>{
    setOptionSelected(e.target.value);
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: '#fff',
        darker: '#fff',
      },
      neutral: {
        main: '#fff',
        contrastText: '#fff',
      },
      components: {
        MuiSelect: {
          styleOverrides: {
            root: {
              '& .MuiSelect-input': {
                color: 'white',
              },
            },
          },
        },
      },
  }});
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
          <li>
            <a href="/superadmin">Create Policeman</a>
          </li>
          <li>
            <a href="/totalfirs">Total FIRs</a>
          </li>
          <li>

             
            
          </li>
        </ul>
        <div style={logoutStyle} onClick={handleLogout}>
        <a>Logout</a>
        </div>
      </nav>
    </>
  );
}
