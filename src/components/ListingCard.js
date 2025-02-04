import React from 'react';
import '../styles/ListingCard.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../data/AxiosInstance';

const ListingCard = ({ listing, user, onDelete }) => {

  const canDelete = user?.roles?.some(role => ["ADMIN", "MODERATOR"].includes(role));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const handleDelete = async (event, listingId) => {
    event.stopPropagation();

    try {
      await axiosInstance.delete(`/api/listings/${listingId}`);

      alert('Listing deleted successfully!');
      onDelete(listingId);
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert(`Failed to delete the listing: ${error.response?.data || error.message}`);
    }
  };

  const baseURL = axiosInstance.defaults.baseURL;
  const imageUrl = listing.imageURLs?.[0]
    ? baseURL + listing.imageURLs[0]
    : 'No_Image_Available.jpg';

  const formatMonth = (month) => {
    return month?.toString().padStart(2, '0') || '';
  };

  return (
    <div className="listing-card" onClick={handleClick}>
      <img src={imageUrl} alt={imageUrl} className="listing-image" />
      <div className="listing-details" onClick={handleClick}>
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-price">€{listing.price}</p>
        <p className="listing-year-make-model">
          {listing.year}-{formatMonth(listing.month)} {listing.make.name} {listing.model.name}
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