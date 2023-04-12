import React from "react";
import Navbar from "../Navbar";
import axios from 'axios';
import "./FirDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailsCard from "./DetailsCard";
import { useEffect ,useState} from "react";

const FirDetails = () => {
    const[firDetails,setFirDetails] = useState([]);
 

  useEffect(()=>{
    axios.get("http://localhost:9002/getFirs").then((res)=>{
        setFirDetails(res.data);
        console.log(firDetails);
    }).catch((err)=>console.log(err));
  },[]);
console.log(firDetails);
  return (
    <div className="container-bg">
      <Navbar />
     { firDetails.map((item)=> <DetailsCard firDetailsArr={item} /> ) }
    </div>
  );
};

export default FirDetails;


