import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // In a real app, fetch booking details from API
    // For now, use mock data
    setBooking({
      id: id,
      garageTitle: 'Tilila Parking',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      totalPrice: 125,
      status: 'confirmed'
    });
  }, [id]);

  const handleViewBookings = () => {
    navigate('/bookings');
  };

  const handleBrowseMore = () => {
    navigate('/browse');
  };

  if (!booking) {
    return <div className="confirmation-container">Loading...</div>;
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-message">
          Your booking has been successfully confirmed. A confirmation email has been sent to your email address.
        </p>

        <div className="booking-details">
          <h2>Booking Details</h2>
          
          <div className="detail-row">
            <span className="detail-label">Booking ID:</span>
            <span className="detail-value">#{booking.id}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Garage:</span>
            <span className="detail-value">{booking.garageTitle}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Check-in:</span>
            <span className="detail-value">
              {new Date(booking.startDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Check-out:</span>
            <span className="detail-value">
              {new Date(booking.endDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="detail-row total">
            <span className="detail-label">Total Paid:</span>
            <span className="detail-value">${booking.totalPrice}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="detail-value status-confirmed">{booking.status}</span>
          </div>
        </div>

        <div className="next-steps">
          <h3>Next Steps</h3>
          <ul>
            <li>📍 Save the garage address for easy access</li>
            <li>📞 Contact the host if you have any questions</li>
            <li>🔑 Check-in instructions will be sent 24 hours before your booking</li>
            <li>⭐ Don't forget to leave a review after your stay</li>
          </ul>
        </div>

        <div className="action-buttons">
          <button onClick={handleViewBookings} className="btn btn-secondary">
            View My Bookings
          </button>
          <button onClick={handleBrowseMore} className="btn btn-primary">
            Browse More Garages
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;