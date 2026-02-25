import React, { useState, useEffect } from 'react';
import { getUserBookings } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import './Dashboard.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, upcoming, past, cancelled

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getUserBookings(1); // Replace with actual user ID
        if (response.success) {
          setBookings(response.data);
        } else {
          setError(response.error);
        }
      } catch (err) {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getFilteredBookings = () => {
    const now = new Date();
    
    switch (filter) {
      case 'upcoming':
        return bookings.filter(b => new Date(b.startDate) > now && b.status !== 'cancelled');
      case 'past':
        return bookings.filter(b => new Date(b.endDate) < now || b.status === 'completed');
      case 'cancelled':
        return bookings.filter(b => b.status === 'cancelled');
      default:
        return bookings;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  if (loading) return <LoadingSpinner message="Loading your bookings..." />;
  if (error) return <ErrorMessage message={error} />;

  const filteredBookings = getFilteredBookings();

  return (
    <div className="my-bookings">
      <div className="bookings-header">
        <h2>My Bookings</h2>
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`filter-tab ${filter === 'past' ? 'active' : ''}`}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
          <button 
            className={`filter-tab ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings found</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/browse'}>
            Browse Garages
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {filteredBookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-image">
                <img src={booking.image || 'https://via.placeholder.com/150'} alt={booking.garageTitle} />
              </div>
              
              <div className="booking-info">
                <h3>{booking.garageTitle}</h3>
                
                <div className="booking-dates">
                  <span>📅 {new Date(booking.startDate).toLocaleDateString()}</span>
                  <span>→</span>
                  <span>{new Date(booking.endDate).toLocaleDateString()}</span>
                </div>
                
                <div className="booking-meta">
                  <span className={`booking-status ${getStatusClass(booking.status)}`}>
                    {booking.status}
                  </span>
                  <span className="booking-price">${booking.totalPrice}</span>
                </div>
              </div>
              
              <div className="booking-actions">
                {booking.status === 'confirmed' && (
                  <>
                    <button className="btn btn-secondary">Modify</button>
                    <button className="btn btn-danger">Cancel</button>
                  </>
                )}
                {booking.status === 'completed' && (
                  <button className="btn btn-primary">Write Review</button>
                )}
                <button className="btn btn-secondary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;