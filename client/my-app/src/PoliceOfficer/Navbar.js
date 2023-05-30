import React from "react";
import axios from "axios";
export default function Navbar() {
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
            <a href="#">Total FIRs</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
