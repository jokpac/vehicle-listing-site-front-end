import { useEffect, useState } from 'react';
import './Home.css';
import axios from '../data/AxiosConfig';
import ListingCard from '../components/Listing/ListingCard';

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('/api/listings');
      setListings(response.data);
    } catch (e) {
      console.e('Error fetching listings: ', e);
      setListings([]);
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
