import React from 'react'
import Navbar  from '../Navbar';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export default function FIROverviewStructure({firs}){
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return(
   <>
   <Navbar />
   <div className="adminReport">
     <p className="adminReport--title">FIR REPORT LIST</p>
     <p className="adminReport--point">List of report that comes under your legislature</p>

     <Grid container spacing={4}>
      {
        firs && firs.map((fir,index)=>{
          return (
            <Grid item xs={3} key={index}>
              <Item>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {value.crimeDetails.crime.toUpperCase()}
                    </Typography>
                    <Typography variant="body2">
                      {value.crimeDetails.address}, {value.crimeDetails.colony}
                      {value.crimeDetails.district}, {value.crimeDetails.state}
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
                        navigateFirClick(value._id);
                      }}
                    >
                      Go to FIR
                    </Button>
                  </CardActions>
                </Card>
              </Item>
            </Grid>
          )
        })
      }
      </Grid>
   </div>
   <div class="align-items-center-FOV ">
       <p class="mb-0">&copy; 2022 - 2023 | All Rights Reserved - Harshit Shukla
         <a href="#" class="text-copy">Privacy Policy</a> |
         <a href="#" class="text-term">Terms of Use</a>
       </p>
     </div>
   </>

  )
}


