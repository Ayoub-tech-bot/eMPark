import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const HostDashboard = () => {
  const { user } = useAuth();
  const [showAddGarage, setShowAddGarage] = useState(false);
  const [myGarages, setMyGarages] = useState([
    {
      id: 1,
      title: 'Tilila Garage',
      bookings: 5,
      earnings: 250,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Agadir port Space',
      bookings: 3,
      earnings: 180,
      rating: 4.5
    }
  ]);

  const handleAddGarage = () => {
    setShowAddGarage(true);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Host Dashboard</h1>
        <p>Manage your garages and earnings</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-icon">🏠</span>
          <div className="stat-info">
            <h3>Total Garages</h3>
            <p className="stat-number">{myGarages.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📅</span>
          <div className="stat-info">
            <h3>Active Bookings</h3>
            <p className="stat-number">8</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-info">
            <h3>Total Earnings</h3>
            <p className="stat-number">1,250DH</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-info">
            <h3>Average Rating</h3>
            <p className="stat-number">4.7</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Your Garages</h2>
          <button onClick={handleAddGarage} className="btn btn-primary">
            + Add New Garage
          </button>
        </div>

        <div className="garages-list">
          {myGarages.map(garage => (
            <div key={garage.id} className="garage-item">
              <div className="garage-info">
                <h3>{garage.title}</h3>
                <div className="garage-metrics">
                  <span className="metric">📅 {garage.bookings} bookings</span>
                  <span className="metric">💰 {garage.earnings}DH earned</span>
                  <span className="metric">⭐ {garage.rating}</span>
                </div>
              </div>
              <div className="garage-actions">
                <button className="btn btn-secondary">Edit</button>
                <button className="btn btn-secondary">View Bookings</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddGarage && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Garage</h2>
            <form className="add-garage-form">
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="e.g., Downtown Secure Parking" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="4" placeholder="Describe your garage..." />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" placeholder="Full address" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price per Day (DH)</label>
                  <input type="number" min="0" />
                </div>
                <div className="form-group">
                  <label>Price per Hour (DH)</label>
                  <input type="number" min="0" />
                </div>
              </div>
              <div className="form-group">
                <label>Size</label>
                <select>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="suv">SUV</option>
                </select>
              </div>
              <div className="form-group">
                <label>Images</label>
                <input type="file" multiple accept="image/*" />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddGarage(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Garage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostDashboard;