import React from 'react';
import './ListingCard.css';
import { useNavigate } from 'react-router-dom';

function ListingCard({ listing }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  return (
    <div className="listing-card" onClick={handleClick}>
      <img src='test.webp' alt={listing.title} className="listing-image" />
      <div className="listing-details">
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-price">${listing.price}</p>
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
    </div>
  );
}

export default ListingCard;