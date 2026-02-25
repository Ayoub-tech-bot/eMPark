// src/components/bookings/BookingForm.jsx
import React, { useState, useEffect } from 'react';
import './BookingForm.css';

const BookingForm = ({ garageId, onBookingComplete }) => {
  const [bookingDetails, setBookingDetails] = useState({
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '17:00',
    vehicleDetails: {
      make: '',
      model: '',
      licensePlate: ''
    },
    specialRequests: ''
  });

  const [price, setPrice] = useState({
    days: 0,
    dayRate: 0,
    hours: 0,
    hourRate: 0,
    total: 0
  });

  const [step, setStep] = useState(1); // 1: Dates, 2: Vehicle, 3: Payment
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock garage data - replace with actual API call
  const garage = {
    pricePerDay: 25,
    pricePerHour: 5
  };

  // Calculate price whenever dates/times change
  useEffect(() => {
    if (bookingDetails.startDate && bookingDetails.endDate) {
      const start = new Date(bookingDetails.startDate);
      const end = new Date(bookingDetails.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Parse times
      const startHour = parseInt(bookingDetails.startTime.split(':')[0]);
      const endHour = parseInt(bookingDetails.endTime.split(':')[0]);
      const diffHours = endHour - startHour;

      const dayCost = diffDays * garage.pricePerDay;
      const hourCost = diffHours * garage.pricePerHour;

      setPrice({
        days: diffDays,
        dayRate: garage.pricePerDay,
        hours: diffHours,
        hourRate: garage.pricePerHour,
        total: dayCost + hourCost
      });
    }
  }, [bookingDetails.startDate, bookingDetails.endDate, 
      bookingDetails.startTime, bookingDetails.endTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (e.g., vehicleDetails.make)
      const [parent, child] = name.split('.');
      setBookingDetails(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Booking submitted:', {
        garageId,
        ...bookingDetails,
        totalPrice: price.total
      });
      
      onBookingComplete?.({
        success: true,
        bookingId: 'BK' + Date.now()
      });
      
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="step dates-step">
      <h3>Select Dates & Times</h3>
      
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={bookingDetails.startDate}
          onChange={handleInputChange}
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={bookingDetails.endDate}
          onChange={handleInputChange}
          min={bookingDetails.startDate}
          required
        />
      </div>

      <div className="time-row">
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={bookingDetails.startTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={bookingDetails.endTime}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      {price.total > 0 && (
        <div className="price-preview">
          <h4>Price Breakdown</h4>
          <p>{price.days} days × ${price.dayRate} = ${price.days * price.dayRate}</p>
          <p>{price.hours} hours × ${price.hourRate} = ${price.hours * price.hourRate}</p>
          <p className="total"><strong>Total: ${price.total}</strong></p>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="step vehicle-step">
      <h3>Vehicle Details</h3>
      
      <div className="form-group">
        <label htmlFor="vehicle.make">Vehicle Make</label>
        <input
          type="text"
          id="vehicle.make"
          name="vehicleDetails.make"
          value={bookingDetails.vehicleDetails.make}
          onChange={handleInputChange}
          placeholder="e.g., Toyota"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="vehicle.model">Vehicle Model</label>
        <input
          type="text"
          id="vehicle.model"
          name="vehicleDetails.model"
          value={bookingDetails.vehicleDetails.model}
          onChange={handleInputChange}
          placeholder="e.g., Camry"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="vehicle.licensePlate">License Plate</label>
        <input
          type="text"
          id="vehicle.licensePlate"
          name="vehicleDetails.licensePlate"
          value={bookingDetails.vehicleDetails.licensePlate}
          onChange={handleInputChange}
          placeholder="ABC-1234"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="specialRequests">Special Requests (Optional)</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={bookingDetails.specialRequests}
          onChange={handleInputChange}
          placeholder="Any special requirements?"
          rows="3"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="step payment-step">
      <h3>Payment</h3>
      
      <div className="booking-summary">
        <h4>Booking Summary</h4>
        <p><strong>Dates:</strong> {bookingDetails.startDate} to {bookingDetails.endDate}</p>
        <p><strong>Times:</strong> {bookingDetails.startTime} - {bookingDetails.endTime}</p>
        <p><strong>Vehicle:</strong> {bookingDetails.vehicleDetails.make} {bookingDetails.vehicleDetails.model}</p>
        <p className="total-price"><strong>Total: ${price.total}</strong></p>
      </div>

      {/* Simple payment form - in production, integrate with Stripe/PayPal */}
      <div className="payment-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="4242 4242 4242 4242"
            required
          />
        </div>

        <div className="card-details-row">
          <div className="form-group">
            <label htmlFor="expiry">Expiry</label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="nameOnCard">Name on Card</label>
          <input
            type="text"
            id="nameOnCard"
            placeholder="John Doe"
            required
          />
        </div>
      </div>

      <p className="secure-note">
        <span>🔒</span> Your payment information is secure
      </p>
    </div>
  );

  return (
    <div className="booking-form-container">
      <div className="progress-bar">
        <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>
          1. Dates & Times
        </div>
        <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>
          2. Vehicle Details
        </div>
        <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>
          3. Payment
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="form-actions">
          {step > 1 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : step === 3 ? 'Confirm Booking' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;