import React from 'react';
import './ListingCard.css';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../services/AuthHeader';
import axios from '/React/vehicle-listings-site-react/src/data/AxiosConfig';

const ListingCard = ({ listing, user, onDelete }) => {

  console.log(user);

  const API_URL = 'http://localhost:8080/api';

  const canDelete = user?.roles?.some(role => ["ADMIN", "MODERATOR"].includes(role));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const handleDelete = async (event, listingId) => {
    event.stopPropagation();

    try {
      const response = await fetch(`${API_URL}/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Listing deleted successfully!');
        onDelete(listingId);
      } else {
        const errorMessage = await response.text();
        alert(`Failed to delete the listing: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('An error occurred while trying to delete the listing.');
    }
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
        className={`listing-type-badge ${listing.listingType === 'SALE' ? 'sale-badge' : 'rent-badge'
          }`}
      >
        {listing.listingType}
      </div>
      {canDelete && (
        <button className='delete-button' onClick={(event) => handleDelete(event, listing.id)}>X</button>
      )}
    </div>
  );
}

export default ListingCard;