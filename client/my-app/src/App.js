import LandingPage from "./LandingPage/LandingPage";
import Navbar from "./Navbar";
import MainComponent from "./MainHomePage";
import Footer from "./Footer";
import FIRGuide from "./FIRGuide/FirGuide";
import AdminsignUP from "./adminSignUP/AdminSignUP";
import Adminlogin from "./adminLogin/AdminLogin";
import FIRform from "./FIRform/FIRform";
import FIROverviewComponent from "./FIROverviewComponent/FirOverviewComponent";
import ForgetPassOTP from "./ForgetPass/ForgetPassOTP";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import FirDetails from "./police/FirDetails";
import Superadmin from "./superAdmin/Superadmin";
import Adminfirs from "./AdminFirs/Adminfirs";
import Firdetail from "./adminFirDetails/Firdetail";
import PoliceOfficer from "./PoliceOfficer/PoliceOfficer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PoliceFirdetail from "./PoliceOfficer/PoliceFirDetail";
export default function App() {
  const [user, setLoginUser] = useState({});

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/superadmin" element={<Superadmin />} />
        <Route path="/totalfirs" element={<Adminfirs />} />
        <Route path="/getFirById/:id" element={<Firdetail />} />
        <Route path="/getFirByIdpolice/:id" element={<PoliceFirdetail />} />
        <Route path="/policeofficer" element={<PoliceOfficer />} />
       
        <Route
          path="/AdminLogin"
          element={<Adminlogin setLoginUser={setLoginUser} />}
        />
        <Route path="/AdminSignUP" element={<AdminsignUP />} />
        <Route path="/FIRform" element={<FIRform />} />
        <Route path="/policeFirDetails" element={<FirDetails />} />
        <Route path="/Footer" element={<Footer />} />

        <Route path="/FIRGuide" element={<FIRGuide />} />
        <Route
          path="/FIROverviewComponent"
          element={<FIROverviewComponent />}
        />
        <Route path="/ForgetPassOTP" element={<ForgetPassOTP />} />
      </Routes>
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
      />

      {/* <LandingPage/>
         <Navbar />
    //     <MainComponent />
    //     <AdminsignUP/>
    //     <FIRform/>
    //     <Footer />
    //     <Adminlogin/>

    // <FIROverviewComponent/>*/}
    </>
  );
}

// function Ternary() {
//   const [ user, setLoginUser] = React.useState({})
// if(user && user.userid)
// {
//   console.log(user.userid);
// return <FIRform />
// } else{
// return <Adminlogin setLoginUser={setLoginUser}/>
// }
//
// }
