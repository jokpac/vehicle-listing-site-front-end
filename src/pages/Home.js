import { useEffect, useState, useCallback } from 'react';
import '../styles/Home.css';
import axiosInstance from '../data/AxiosInstance';
import AuthService from '../services/AuthService';
import ListingCard from '../components/ListingCard';
import FilterCard from '../components/FilterCard';
import { filterListings } from '../utils/filterUtils';
import Swal from "sweetalert2";

function Home() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [user, setUser] = useState(null);

  const fetchListings = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/listings');
      const activeListings = response.data.filter(listing => listing.listingStatus === 'ACTIVE');
      setListings(activeListings);
      setFilteredListings(activeListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
      setFilteredListings([]);
    }
  }, []);

  useEffect(() => {
    fetchListings();
    setUser(AuthService.getCurrentUser());
  }, [fetchListings]);

  const handleDeleteListing = async (listingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`/api/listings/${listingId}`);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== listingId)
      );
      setFilteredListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== listingId)
      );

      await Swal.fire("Deleted!", "The listing has been removed.", "success"); // ✅ Ensures correct flow
    } catch (error) {
      console.error("Error deleting listing:", error);
      Swal.fire("Error!", "Failed to delete the listing.", "error");
    }
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