import React ,{useEffect,useState}from 'react'
import Navbar from './Navbar'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// import "./firdetail.css";
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
    const [assignedFirs,setAssignedFirs] = useState(null);
    console.log(state);

   
    const { userId } = state;
    useEffect(async()=>{
      await  axios.get(`http://localhost:9002/getFirsByPoliceMenId/${userId}`).then((res)=>{
            console.log(res);
            setAssignedFirs(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[]);
    const maphtmlHandler = ()=>{
            const newWindow = window.open(
              "http://127.0.0.1:5500/client/my-app/src/MAp/map.html",
              "_blank"
            );
            if (newWindow) {
              newWindow.focus();
            }
    }
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
                        //   onClick={() => {
                        //     navigateFirClick(value._id);
                        //   }}
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
    </div>
  );
}

export default PoliceOfficer