import React from 'react';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import ListingDetails from './pages/ListingDetails.js';
import ListingForm from './pages/ListingForm.js';
import Dashboard from './pages/Dashboard.js';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/add-listing" element={<ListingForm />} />
        <Route path="/edit-listing/:listingId" element={<ListingForm />} />
      </Routes>
    </Router>
  );
}

export default App;