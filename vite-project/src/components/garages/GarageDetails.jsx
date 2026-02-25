import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGarages } from '../../context/GarageContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import './GarageDetails.css';

const GarageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchGarageDetails, loading, error } = useGarages();
  const { isAuthenticated } = useAuth();
  const [garage, setGarage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const loadGarage = async () => {
      const data = await fetchGarageDetails(id);
      setGarage(data);
    };
    loadGarage();
  }, [id, fetchGarageDetails]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/garages/${id}` } });
    } else {
      navigate(`/book/${id}`);
    }
  };

  const handleContactHost = () => {
    // Implement contact host functionality
    console.log('Contact host:', garage?.host);
  };

  if (loading) return <LoadingSpinner message="Loading garage details..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!garage) return <ErrorMessage message="Garage not found" />;

  return (
    <div className="garage-details">
      <div className="details-container">
        {/* Image Gallery */}
        <div className="gallery-section">
          <div className="main-image">
            <img 
              src={garage.images?.[selectedImage] || 'https://via.placeholder.com/800x400?text=Garage'} 
              alt={garage.title}
            />
          </div>
          <div className="thumbnail-grid">
            {garage.images?.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${garage.title} - ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="details-content">
          <div className="content-left">
            <h1 className="garage-title">{garage.title}</h1>
            
            <div className="rating-section">
              <span className="stars">
                {'★'.repeat(Math.floor(garage.rating))}
                {'☆'.repeat(5 - Math.floor(garage.rating))}
              </span>
              <span className="rating-value">{garage.rating}</span>
              <span className="review-count">({garage.reviewCount} reviews)</span>
            </div>

            <div className="location-info">
              <svg className="icon" viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>{garage.address}, {garage.city}</span>
            </div>

            <div className="features-list">
              <h3>Features</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <span className="feature-icon">📏</span>
                  <span>Size: {garage.size}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Security: {garage.hasSecurity ? '24/7' : 'Basic'}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🚗</span>
                  <span>Vehicle access: 24/7</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💡</span>
                  <span>Lighting: LED</span>
                </div>
              </div>
            </div>

            <div className="description-section">
              <h3>About this space</h3>
              <p>{garage.description || 'No description provided.'}</p>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
              <h3>Reviews ({garage.reviewCount})</h3>
              {garage.reviews?.slice(0, showAllReviews ? undefined : 3).map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <span className="reviewer-name">{review.userName}</span>
                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
              {garage.reviews?.length > 3 && !showAllReviews && (
                <button 
                  className="btn btn-secondary show-more-btn"
                  onClick={() => setShowAllReviews(true)}
                >
                  Show all {garage.reviewCount} reviews
                </button>
              )}
            </div>
          </div>

          {/* Booking Card - Right Side */}
          <div className="booking-card">
            <div className="price-display">
              <span className="price">${garage.pricePerDay}</span>
              <span className="price-unit">/day</span>
              <span className="separator">or</span>
              <span className="price">${garage.pricePerHour}</span>
              <span className="price-unit">/hour</span>
            </div>

            <div className="host-info">
              <h4>Hosted by {garage.host?.name}</h4>
              <div className="host-rating">
                <span className="stars">
                  {'★'.repeat(Math.floor(garage.host?.rating || 0))}
                </span>
                <span>{garage.host?.rating} · {garage.host?.reviews || 0} reviews</span>
              </div>
            </div>

            <div className="booking-actions">
              <button 
                className="btn btn-primary book-now-btn"
                onClick={handleBookNow}
                disabled={!garage.isAvailable}
              >
                {garage.isAvailable ? 'Book Now' : 'Currently Unavailable'}
              </button>
              <button 
                className="btn btn-secondary contact-host-btn"
                onClick={handleContactHost}
              >
                Contact Host
              </button>
            </div>

            <div className="availability-note">
              {garage.isAvailable ? (
                <span className="available">✓ Available for your dates</span>
              ) : (
                <span className="unavailable">✗ Not available at the moment</span>
              )}
            </div>

            <div className="safety-info">
              <h4>Safety & Property</h4>
              <ul>
                <li>🔒 Security camera on premises</li>
                <li>🚗 Free cancellation for 48 hours</li>
                <li>📝 Booking confirmation within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageDetails;