import { useEffect, useState } from 'react';
import '../styles/Home.css';
import AuthService from '../services/AuthService';
import ListingService from '../services/ListingService';
import ListingCard from '../components/ListingCard';
import FilterCard from '../components/FilterCard';
import Swal from "sweetalert2";

function Home() {
  const [filteredListings, setFilteredListings] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch listings with or without filters
  const fetchListings = async (filters = {}) => {
    // Only active listings will be displayed
    const finalFilters = { ...filters, listingStatus: 'ACTIVE' };
  
    try {
      const filteredData = await ListingService.getListings(finalFilters);
      setFilteredListings(filteredData);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setFilteredListings([]);
    }
  };

  useEffect(() => {
    fetchListings(); // Fetch all listings when page loads
    setUser(AuthService.getCurrentUser());
  }, []);

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
      await ListingService.deleteListing(listingId);
      setFilteredListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== listingId)
      );
      await Swal.fire("Deleted!", "The listing has been removed.", "success");
    } catch (error) {
      console.error("Error deleting listing:", error);
      Swal.fire("Error!", "Failed to delete the listing.", "error");
    }
  };

  return (
    <div className="home-container">
      <FilterCard className="filter-card" onFilter={(filters) => fetchListings(filters)} />
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