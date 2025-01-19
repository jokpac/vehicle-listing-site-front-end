import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import ListingDetails from './pages/ListingDetails.js';
import AddListingForm from './pages/AddListingForm.js';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/add-listing" element={<AddListingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
