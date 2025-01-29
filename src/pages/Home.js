import { useEffect, useState } from 'react';
import './Home.css';
import axios from '../data/AxiosConfig';
import AuthService from '../services/AuthService';
import ListingCard from '../components/Listing/ListingCard';

function Home() {
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchListings();
    const loggedInUser = AuthService.getCurrentUser();
    setUser(loggedInUser);
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('/api/listings');
      const activeListings = response.data.filter(listing => listing.listingStatus === 'ACTIVE');
      setListings(activeListings);
    } catch (e) {
      console.error('Error fetching listings: ', e);
      setListings([]);
    }
  };

  const handleListingDelete = (deletedId) => {
    setListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== deletedId)
    );
  };

  return (
    <div className="vehicle-listings">
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onDelete={handleListingDelete}
            user={user}
          />
        ))
      ) : (
        <p>No listings available</p>
      )}
    </div>
  );
}

export default Home;