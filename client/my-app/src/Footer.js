import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
export default function Footer(){
  const navigate = useNavigate();
  const navigateHandler = ()=>{
    navigate("/AdminLogin");
  }
  return (
    <>
      <div
        class="alert alert-success w-50"
        role="alert"
      >
        Your Form is Submitted successfully.

        <button class="btn btn-primary btn-sm" onClick={navigateHandler}>Fill another</button>
      </div>
    </>
  );
}
