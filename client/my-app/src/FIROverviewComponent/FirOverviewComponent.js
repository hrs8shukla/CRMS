import React, { useState, useEffect } from 'react'
import "./FIROverviewStyle.css"
import axios from 'axios';
import Complaint from "./FIROverviewStructure";


// FIRST INSTALL THIS TO USE ATLUS API
// npm install --save realm-web

export default function FirOverviewComponent(){


    





       // CODE FOR FETCHING DATA FROM 3RD PARTY INTERNET API PROVIDER
  const [id,setUserId] = useState(null);
     const [users, setUsers] = useState([]);


      const getUsers = async () => {
        
          axios.post("http://localhost:9002/getUsersFir", id).then((res)=>{
            console.log(res);
            setUsers(res.data)
          }).catch((err)=>{
            console.log(err);
          })         
      }



      useEffect(() => {
    const userId = localStorage.getItem("userId");
        setUserId(userId);
          getUsers();
      }, []);

      
          console.log(users)

  return(
    <>
      <Complaint firs={users}/>
    </>

  )
}
