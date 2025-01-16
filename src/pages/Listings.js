import { useEffect, useState } from 'react';
import './Listings.css';
import config from '../config';
import ListingCard from '../components/Listing/ListingCard';

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(config.API_ROOT_PATH + "/api/listings")
      .then((response) => response.json())
      .then((json) => setListings(json))
      .catch((e) => console.error(e));

    console.log("Promise started");
  }, []);

  return (
    <div className="vehicle-listings">
      <h1>Vehicle Listings</h1>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <p>No listings available</p>
      )}
    </div>
  );
}

export default Listings;
