import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ListingDetails.css';
import axiosInstance from '../data/AxiosInstance';

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const baseURL = axiosInstance.defaults.baseURL;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axiosInstance.get(`/api/listings/${id}`);
        setListing(response.data);
      } catch (err) {
        setError('Failed to fetch listing details');
        console.error('Error fetching listing:', err);
      }
    };

    fetchListing();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!listing) {
    return <div>Loading...</div>;
  }

  const formatMonth = (month) => {
    return month?.toString().padStart(2, '0') || '';
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.imageURLs.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + listing.imageURLs.length) % listing.imageURLs.length
    );
  };

  const imageUrl = listing.imageURLs?.[currentImageIndex]
  ? baseURL + listing.imageURLs[currentImageIndex]
  : '/No_Image_Available.jpg';

  return (
    <div className="listing-details-container">
      <div className="listing-main-image-container">
        <button className="navigation-button left" onClick={goToPreviousImage}>
          &#10094;
        </button>

        <img
          src={imageUrl}
          alt={imageUrl}
          className="listing-main-image"
        />

        <button className="navigation-button right" onClick={goToNextImage}>
          &#10095;
        </button>
      </div>

      <div className="listing-thumbnails">
        {listing.imageURLs?.map((imageURL, index) => (
          <img
            key={index}
            src={baseURL + imageURL}
            alt={`thumbnail-${index}`}
            className={`listing-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
      <h1 className="listing-details-title">{listing.title}</h1>
      <p className="listing-details-price">€{listing.price}</p>

      <div className="listing-details-parameters">
        <div className="parameter-item">
          <div className="parameter-label">Date of manufacture</div>
          <div className="parameter-value">{listing.year}-{formatMonth(listing.month)}</div>
        </div>
        <div className="parameter-item">
          <div className="parameter-label">Make & Model</div>
          <div className="parameter-value">{`${listing.makeName} ${listing.modelName}`}</div>
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
          <div className="parameter-value">{`${listing.engineSize}L, ${listing.enginePower} HP`}</div>
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
          <div className="parameter-value">{`${listing.cityName}, ${listing.countryName}`}</div>
        </div>
      </div>
      <p className="dsc">Description</p>
      <p className="listing-details-description">{listing.description}</p>

      <a href="/" className="listing-details-back-button">
        Back to Listings
      </a>
    </div>
  );
}

export default ListingDetails;