import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Listings from './pages/Listings';
import ListingDetails from './components/Listing/ListingDetails';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
