import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./FirDetails.css";
const DetailsCard = ({firDetailsArr}) => {
    // const {beatNo, status,updatedAt,createdAt,_id,}  = firDetailsArr;
    // const {address,colony,crime,date,day,district, pinCode,state,suspected,time} = firDetailsArr.crimeDetails;
    // const {aadharNo,address:complaintAddress, dob,name,nationality,occupation} = firDetailsArr.complaintUser;
    console.log(firDetailsArr);
     return (
    
    <div>
      <div className="cards">
        <div class="card" style={{ width: "25rem" }}>
          
          <div class="card-body">
            <h5 class="card-title">{firDetailsArr.crimeDetails.colony},{firDetailsArr.crimeDetails.district},{firDetailsArr.crimeDetails.state}</h5>
            <p class="card-text">{firDetailsArr.status}</p>
            <a href="#" class="btn btn-primary">
              Check out Progress
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsCard


