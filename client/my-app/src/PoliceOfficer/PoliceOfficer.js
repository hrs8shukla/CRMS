import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
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
const PoliceOfficer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [assignedFirs, setAssignedFirs] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: "", log: "" });
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  console.log(state);

  const { userId,userDetail } = state;
  localStorage.setItem("userId",userId);
  useEffect(async () => {
    await axios
      .get(`http://localhost:9002/getFirsByPoliceMenId/${userId}`)
      .then((res) => {
        console.log(res);
        setAssignedFirs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const maphtmlHandler = async () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = daysOfWeek[date.getDay()];

    const time = `${hours}:${minutes}`;
    // console.log(time);
    var url = `http://cms-env.eba-bqgbv5gm.us-east-1.elasticbeanstalk.com/get`;
    const params = {
      dist: userDetail.district,
      state: userDetail.state,
      day: day,
      time: time,
    };
    const searchParams = new URLSearchParams(params).toString();
    // const data = await axios.get(
    //   "http://cms-env.eba-bqgbv5gm.us-east-1.elasticbeanstalk.com/get?dist=Noida&state=Uttar Pradesh&day=Tuesday&time=13:01"
    // );
    // console.log(data);
    fetch(`${url}?${searchParams}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.Location.addresses);
        console.log("called");
        var address = data.Address;
        var log = data.Location.addresses[0].longitude;
        var lat = data.Location.addresses[0].latitude;
        console.log(log,lat);
        setCoordinates({ log, lat });
        setAddress(address);
        setTime(time);
        setIsClicked(true);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <Navbar />
      {assignedFirs && (
        <Grid container spacing={4}>
          {assignedFirs.map((value, index) => {
            return (
              <Grid item xs={3} key={index}>
                <Item>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {value.crimeDetails.crime.toUpperCase()}
                      </Typography>
                      <Typography variant="body2">
                        {value.crimeDetails.address},{" "}
                        {value.crimeDetails.colony}
                        {value.crimeDetails.district},{" "}
                        {value.crimeDetails.state}
                        {value.crimeDetails.pinCode}
                        <br />
                      </Typography>
                      <br />
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Status:{value.status}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          navigate(`/getFirByIdpolice/${value._id}`);
                        }}
                      >
                        Go to FIR
                      </Button>
                    </CardActions>
                  </Card>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      )}
      <div>
        <Button size="small" variant="contained" onClick={maphtmlHandler}>
          Check Hotspot
        </Button>
      </div>
      <div>
        {isClicked && (
          <div>
            <div>
              <h1 style={{color:"black"}}>Map at a specified location</h1>
              <p id="address">{address}</p>
              <p id="time">{time}</p>
            </div>
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.log}&hl=es;&output=embed`}
              // src={`https://maps.google.com/maps?q=28.5708,77.3261&hl=es;&output=embed`}
              height="500px"
              width="100%"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoliceOfficer;
