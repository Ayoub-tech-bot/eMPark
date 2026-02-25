import React from 'react';
import { useAuth } from '../../context/AuthContext';
import MyBookings from './MyBookings';
import './Dashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p>Manage your bookings and account settings</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-icon">📅</span>
          <div className="stat-info">
            <h3>Active Bookings</h3>
            <p className="stat-number">3</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-info">
            <h3>Total Reviews</h3>
            <p className="stat-number">12</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-info">
            <h3>Total Spent</h3>
            <p className="stat-number">450DH</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Your Upcoming Bookings</h2>
        <MyBookings />
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="action-card" onClick={() => window.location.href = '/browse'}>
            <span className="action-icon">🔍</span>
            <h3>Find a Garage</h3>
            <p>Search for available parking spaces</p>
          </button>
          <button className="action-card" onClick={() => window.location.href = '/bookings'}>
            <span className="action-icon">📋</span>
            <h3>View All Bookings</h3>
            <p>Check your booking history</p>
          </button>
          <button className="action-card" onClick={() => window.location.href = '/profile'}>
            <span className="action-icon">⚙️</span>
            <h3>Account Settings</h3>
            <p>Update your profile and preferences</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;