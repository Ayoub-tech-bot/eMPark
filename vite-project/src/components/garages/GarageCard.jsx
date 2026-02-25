// src/components/garages/GarageCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GarageCard.css';

const GarageCard = ({ garage }) => {
  const navigate = useNavigate();

  // Default image if none provided
  const defaultImage = '/src/assets/hamza-yasri-CKSpHJNR93U-unsplash.jpg';
  
  // Calculate average rating (mock data for now)
  const rating = garage.rating || 4.5;
  const reviewCount = garage.reviewCount || 12;

  const handleViewDetails = () => {
    navigate(`/garages/${garage.id}`);
  };

  const handleQuickBook = () => {
    navigate(`/book/${garage.id}`);
  };

  return (
    <div className="garage-card">
      <div className="garage-image">
        <img 
          src={garage.images?.[0] || defaultImage} 
          alt={garage.title}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        {garage.isAvailable ? (
          <span className="availability-badge available">Available</span>
        ) : (
          <span className="availability-badge unavailable">Booked</span>
        )}
      </div>

      <div className="garage-info">
        <h3 className="garage-title">{garage.title}</h3>
        
        <div className="garage-location">
          <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>{garage.address}, {garage.city}</span>
        </div>

        <div className="garage-features">
          <span className="feature">
            <strong>Size:</strong> {garage.size}
          </span>
          <span className="feature">
            <strong>Security:</strong> {garage.hasSecurity ? 'Yes' : 'No'}
          </span>
        </div>

        <div className="garage-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(rating))}
            {'☆'.repeat(5 - Math.floor(rating))}
          </span>
          <span className="rating-value">{rating}</span>
          <span className="review-count">({reviewCount} reviews)</span>
        </div>

        <div className="garage-price">
          <span className="price">{garage.pricePerDay}DH</span>
          <span className="price-unit">/day</span>
          <span className="separator">|</span>
          <span className="price">{garage.pricePerHour}DH</span>
          <span className="price-unit">/hour</span>
        </div>

        <div className="card-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleViewDetails}
          >
            View Details
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleQuickBook}
            disabled={!garage.isAvailable}
          >
            Quick Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default GarageCard;