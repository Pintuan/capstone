import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import pages
import Navbar from '../components/IndexNavigation';
import Login from '../components/index/Login';
import ContactUs from '../components/index/Inquire';
import About from '../components/index/About';
import Home from '../components/index/Home';
import LoginEmail from '../components/index/LoginEmail';
import ForgotPassword from '../components/index/forgotPass';
import Downloads from '../components/index/Downloads';
import Activation from '../components/index/Activate';

function Index() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Inquire" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginEmail" element={<LoginEmail />} />
        <Route path="/Downloads" element={<Downloads />} />
        <Route path="/Activation" element={<Activation />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default Index;