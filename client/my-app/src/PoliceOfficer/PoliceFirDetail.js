import React, { useEffect, useState } from "react";
import MapComponent from "../MapContainer/MapComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./PoliceFirDetail.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const PoliceFirdetail = () => {
  const [optionSelected, setOptionSelected] = useState(null);
  const [firData, setFirData] = useState(null);
  const [policeOfficerData, setPoliceOfficerData] = useState(null);
  const [updateFirStatus, setUpdateFirStatus] = useState(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:9002/getFirById/${id}`)
        .then((res) => {
          setFirData(res.data);
        })
        .catch((err) => {
          alert("some error occured, please repeat the request!");
          console.log(err);
        });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchpoliceDetails = async () => {
      await axios
        .get(`http://localhost:9002/getPoliceMenList`)
        .then((res) => {
          console.log(res);
          setPoliceOfficerData(res.data);
        })
        .catch((err) => {
          alert("some error occured, please repeat the request!");
        });
    };
    fetchpoliceDetails();
  }, []);

  const handleOption = (officer) => {
    console.log(officer);
    // setUpdateFirStatus(() => {
    //   return {
    //     firId: firData._id,
    //     policeMenId: officerId,
    //   };
    // });
    // setOptionSelected(`${fName} ${lName}`);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const selectedData = policeOfficerData.find(
      (option) => option._id === e.target.value
    );
    performAction(selectedData);
  };
  const performAction = (selectedvalue) => {
    console.log(selectedvalue);
    setUpdateFirStatus(() => {
      return {
        firId: firData._id,
        policeMenId: selectedvalue._id,
      };
    });
  };
  useEffect(() => {
    console.log(updateFirStatus);
  }, [updateFirStatus]);
  //   const submitStatusHandler = async () => {
  //     console.log(updateFirStatus);
  //     await axios
  //       .post("http://localhost:9002/assignFirToPoliceMen", updateFirStatus)
  //       .then((res) => {
  //         console.log(res);
  //         toast.success(`Assigned Successfully`,{
  //           position:"top-center",
  //           autoClose:3000,
  //           hideProgressBar:false,
  //           closeOnClick:true,
  //           pauseOnHover:true,
  //           draggable:true,/
  //           progress: undefined,
  //           theme:"light",
  //           containerStyle: { width: '500px' }
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  const handleSelectChange = (e) => {
    setOptionSelected(e.target.value);
  };

  const submitUpdatedStatusHandler = () => {
    if (optionSelected) {
      const data = {
        status: optionSelected,
        firId: firData._id,
      };
      axios
        .post("http://localhost:9002/policeMenUpdateStatus", data)
        .then((res) => {
          toast.success(`Update status successfully`, {
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
        })
        .catch((err) => {
          toast.error(`Try Again!!`, {
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
        });
    } else {
      toast.error(`Update status first!`, {
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
    }
  };

  return (
    <div>
      <Navbar />
      {firData && policeOfficerData && (
        <div className="fir-container">
          <Grid container spacing={2}>
            <Grid item>
              <Item>
                <Card>
                  <CardContent>
                    <Typography variant="h3" component="div">
                      {firData.crimeDetails.crime.toUpperCase()}
                    </Typography>
                    <Typography variant="body2">
                      {firData.crimeDetails.address},
                      {firData.crimeDetails.colony},
                      {firData.crimeDetails.district},
                      {firData.crimeDetails.state},
                      {firData.crimeDetails.pinCode}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Status:{firData.status}
                      <br />
                    </Typography>
                    <Typography variant="body2">
                      Time& Date: {firData.createdAt}
                      <br />
                      Updated At: {firData.updatedAt}
                      <br />
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="body3">
                      Complaint User Info:
                      <br />
                      Name: {firData.complaintUser.name},<br />
                      Address: {firData.complaintUser.address},<br />
                      Aadhar No. :{firData.complaintUser.aadharNo},<br />
                      Date of Birth : {firData.complaintUser.dob},<br />
                      Nationality: {firData.complaintUser.nationality}
                      <br />
                      <br />
                    </Typography>
                    <span className="updatespan">Update Status:</span>
                    <select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={optionSelected}
                      onChange={handleSelectChange}
                    >
                      <option default>none</option>
                      <option value={"pending"}>pending</option>
                      <option value={"approved"}>approved</option>
                      <option value={"reject"}>reject</option>
                      <option value={"hold"}>hold</option>
                      <option value={"assigned"}>assigned</option>
                      <option value={"accepted"}>accepted</option>
                    </select>
                  </CardContent>
                  <CardActions>
                    <Button onClick={submitUpdatedStatusHandler}>
                      Submit Status
                    </Button>
                  </CardActions>
                </Card>
              </Item>
            </Grid>
          </Grid>
        </div>
      )}

      {/* <MapComponent latitude={37.7749} longitude={-122.4194} /> */}
    </div>
  );
};

export default PoliceFirdetail;
