import { useEffect, useState, useCallback } from 'react';
import './Home.css';
import axios from '../data/AxiosConfig';
import AuthService from '../services/AuthService';
import ListingCard from '../components/Listing/ListingCard';
import FilterCard from '../components/FilterCard';
import { filterListings } from '../utils/filterUtils';

function Home() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [user, setUser] = useState(null);

  const fetchListings = useCallback(async () => {
    try {
      const response = await axios.get('/api/listings');
      const activeListings = response.data.filter(listing => listing.listingStatus === 'ACTIVE');
      setListings(activeListings);
      setFilteredListings(activeListings);
    } catch (e) {
      console.error('Error fetching listings: ', e);
      setListings([]);
      setFilteredListings([]);
    }
  }, []);

  useEffect(() => {
    fetchListings();
    setUser(AuthService.getCurrentUser());
  }, [fetchListings]);

  const handleDeleteListing = (listingId) => {
    setListings(prevListings => prevListings.filter(listing => listing.id !== listingId));
    setFilteredListings(prevListings => prevListings.filter(listing => listing.id !== listingId));
  };

  const handleFilter = (filters) => {
    setFilteredListings(filterListings(listings, filters));
  };

  return (
    <div className="home-container">
      <FilterCard className="filter-card" onFilter={handleFilter} />
      <div className="vehicle-listings">
        {filteredListings.length ? filteredListings.map(listing => (
          <ListingCard
            key={listing.id}
            listing={listing}
            user={user}
            onDelete={handleDeleteListing}
          />
        )) : <p>No listings available</p>}
      </div>
    </div>
  );
}

export default Home;