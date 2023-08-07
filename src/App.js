import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./pages/register/SignIn";
import SignUp from "./pages/register/SignUp";
import ForgotPassword from "./pages/register/ForgotPassword";
import HomePage from "./pages/home/Home";
import GetStarted from "./pages/getStarted/GetStarted";
//import topLeftNavbar from './pages/home/components/topLeftNavBar';
import Navbar from "./pages/home/components/Navbar";
import AboutUs from "./pages/about/About";
import HeroSection from "./pages/home/components/HeroSection";
import Services from "./pages/services/Services";
import ContactUs from "./pages/contact/Contact";
//import NavBar2 from "./pages/navbar/NavBar2";
import Footer from "./pages/home/components/Footer";
import AdminPlasticCollectionResponse from "./pages/admin/AdminPlasticCollectionResponse";
import MakeRecycleRequest from "./pages/collectionRequest/MakeRecycleRequest";
import MakePaymentTransfer from "./pages/payment/MakeTransfer";
import MakeTransfer from "./pages/payment/MakeTransfer";
import PlasticCollectionAgentSignUp from "./pages/register/plasticCollectionAgentSignUp/PlasticCollectionAgentSignUp";
import RecycleCompanyRegisteration from "./pages/register/recycleCompanyRegisteration/RecycleCompanyRegisteration";
import CustomerRegistration from "./pages/register/customerRegistration/CustomerRegistration";
import CompleteRegistration from "./pages/register/completeRegistration/CompleteRegistration";
import CustomerDashboard from "./pages/customerDashboard/CustomerDashboard";
import PaymentReceipt from "./pages/paymentReceipt/paymentReceipt";
import EcoPalDashboard from "./pages/ecoPalDashboard/EcoPalDashboard";
import PickUpAgentService from "./pages/pickUpAgentServices/PickUpAgentService";
import PayStackPayment from "./pages/payment/PayStackPayment";
import RecyclPalMap from "./pages/recyclpalMapServices/RecyclPalMap";

//import PlasticCollectionRequest from './pages/collectionRequest/PlasticCollectionRequest';

import "./App.css";

// import { useState } from 'react';
// import { useEffect } from 'react';
// import { async } from 'react-cloudinary-upload-widget';

const App = () => {
  // const[requests, setApiResponse]= useState([])

  // const fetchRequest =  async() =>{

  // }

  // useEffect(()=> {

  // }, [])
  return (
    <div className="app">
      {/* <Navbar/> */}
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/Navbar" element={<Navbar />} />
        {/* <Route path="/Navbar2" element={<NavBar2 />} /> */}
        {/* <Route path="/topLeftNavbar" element={<topLeftNavbar />} /> */}
        <Route path="/HeroSection" element={<HeroSection />} />
        <Route path="/MakeRecycleRequest" element={<MakeRecycleRequest />} />
        {/* <Route path="/PlasticCollectionRequest" element={<PlasticCollectionRequest requests={requests} setApiResponse={setApiResponse}/>} /> */}
        <Route path="/About" element={<AboutUs />} />
        <Route
          path="/AdminPlasticCollectionResponse"
          element={<AdminPlasticCollectionResponse />}
        />
        <Route path="/MakeTransfer" element={<MakePaymentTransfer />} />
        <Route path="/MakeTransfer" element={<MakeTransfer />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/Services" element={<Services />} />
        <Route
          path="/RecycleCompanyRegisteration"
          element={<RecycleCompanyRegisteration />}
        />
        <Route
          path="/CustomerRegistration"
          element={<CustomerRegistration />}
        />
        <Route path="CompleteRegistration" element={<CompleteRegistration />} />
        <Route path="/AgentSignUp" element={<PlasticCollectionAgentSignUp />} />
        <Route path="CustomerDashboard" element={<CustomerDashboard />} />
        <Route path="EcoPalDashboard" element={<EcoPalDashboard />} />
        <Route path="PickUpAgentService" element={<PickUpAgentService />} />
        <Route path="/PaymentReceipt" element={<PaymentReceipt />} />
        <Route path="/PayStackPayment" element={<PayStackPayment />} />
        <Route path="/RecyclPalMap" element={<RecyclPalMap />} />
        RecyclPalMap
        <Route path="/Footer" element={<Footer />} />
        <Route path="*" element={<Navigate to="/HomePage" />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
