import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';
import axios from '../data/AxiosConfig';
import ListingCard from '../components/Listing/ListingCard';

function Home() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('/api/listings');
      setListings(response.data);
    } catch (e) {
      console.e('Error fetching listings: ', e);
    }
  };

  const handleListingDelete = async (id) => {
    try {
      await axios.delete(`/api/listings/${id}`);
      fetchListings();
    } catch (e) {
      console.e('Error deleting listing: ', e);
    }
  };

  return (
    <div className="vehicle-listings">
      <h1>Vehicle Listings</h1>
      <button className="add-listing-button" onClick={() => navigate("/add-listing")}>
        Add Listing
      </button>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            onDelete={handleListingDelete} 
          />
        ))
      ) : (
        <p>No listings available</p>
      )}
    </div>
  );
}

export default Home;
