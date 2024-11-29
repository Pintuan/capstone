import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import pages
import Navbar from '../components/IndexNavigation';
import Login from '../components/index/Login';
import ContactUs from '../components/index/Inquire';
import About from '../components/index/About';
import Home from '../components/index/Home';
import LoginEmail from '../components/index/LoginEmail';
import LoginFP from '../components/index/LoginFP';
import Downloads from '../components/index/Downloads';

function Index() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginEmail" element={<LoginEmail />} />
        <Route path="/loginFP" element={<LoginFP />} />
        <Route path="/Downloads" element={<Downloads />} />
      </Routes>
    </div>
  );
}

export default Index;