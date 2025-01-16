import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ListingDetails.css';
import config from '../../config';

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetch(`${config.API_ROOT_PATH}/api/listings/${id}`)
      .then((response) => response.json())
      .then((data) => setListing(data))
      .catch((error) => console.error('Error fetching listing:', error));
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
<div className="listing-details-container">
  <img
    src={`${process.env.PUBLIC_URL}/test.webp`}
    alt={listing.title}
    className="listing-details-image"
  />
  <h1 className="listing-details-title">{listing.title}</h1>
  <p className="listing-details-price">${listing.price}</p>
  
  <div className="listing-details-parameters">
    <div className="parameter-item">
      <div className="parameter-label">Date of manufacture</div>
      <div className="parameter-value">{`${listing.year}-${listing.month}`}</div>
    </div>
    <div className="parameter-item">
      <div className="parameter-label">Make & Model</div>
      <div className="parameter-value">{`${listing.make.name} ${listing.model.name}`}</div>
    </div>
    <div className="parameter-item">
      <div className="parameter-label">Mileage</div>
      <div className="parameter-value">{listing.mileage} km</div>
    </div>
    <div className="parameter-item">
      <div className="parameter-label">Fuel Type</div>
      <div className="parameter-value">{listing.fuelType}</div>
    </div>
    <div className="parameter-item">
      <div className="parameter-label">Engine</div>
      <div className="parameter-value">{`${listing.engineSize}L, ${listing.enginePower}`}HP</div>
    </div>
    <div className="parameter-item">
      <div className="parameter-label">Transmission</div>
      <div className="parameter-value">{listing.transmission}</div>
    </div>
    <div className="parameter-item">
      <div className="parameter-label">Driven wheels</div>
      <div className="parameter-value">{listing.drivenWheels}</div>
    </div>
    <div className="parameter-item">
      <div className="parameter-label">Location</div>
      <div className="parameter-value">{`${listing.city.name}, ${listing.country.name}`}</div>
    </div>
  </div>
  <p className='dsc'>Description</p>
  <p className="listing-details-description">{listing.description}</p>
  
  <a href="/" className="listing-details-back-button">
    Back to Listings
  </a>
</div>

  );
}

export default ListingDetails;
