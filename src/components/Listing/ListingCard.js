import React from 'react';
import './ListingCard.css';
import { useNavigate } from 'react-router-dom';
import axios from '/React/vehicle-listings-site-react/src/data/AxiosConfig';

function ListingCard({ listing, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const baseURL = axios.defaults.baseURL;
  const imageUrl = listing.imageURLs?.[0] 
      ? baseURL + listing.imageURLs[0] 
      : 'No_Image_Available.jpg';

  return (
    <div className="listing-card" onClick={handleClick}>
      <img src={imageUrl} alt={imageUrl} className="listing-image" />
      <div className="listing-details" onClick={handleClick}>
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-price">€{listing.price}</p>
        <p className="listing-year-make-model">
          {listing.year}-{listing.month} {listing.make.name} {listing.model.name}
        </p>
        <p className="listing-mileage">Mileage: {listing.mileage} km</p>
        <p className="listing-fuel-transmission">
          {listing.fuelType}, {listing.transmission}
        </p>
        <p className="listing-location">
          {listing.city.name}, {listing.country.name}
        </p>
      </div>
      <div
        className={`listing-type-badge ${
          listing.listingType === 'SALE' ? 'sale-badge' : 'rent-badge'
        }`}
      >
        {listing.listingType}
      </div>
      <button
        className="delete-button"
        onClick={() => onDelete(listing.id)}
      >
        X
      </button>
    </div>
  );
}

export default ListingCard;