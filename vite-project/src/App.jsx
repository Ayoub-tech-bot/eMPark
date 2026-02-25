import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/common/Navbar';
import LoadingSpinner from './components/common/LoadingSpinner';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SearchBar from './components/garages/SearchBar';
import GarageList from './components/garages/GarageList';
import GarageDetails from './components/garages/GarageDetails';
import BookingForm from './components/bookings/BookingForm';
import BookingConfirmation from './components/bookings/BookingConfirmation';
import UserDashboard from './components/dashboard/UserDashboard';
import HostDashboard from './components/dashboard/HostDashboard';
import MyBookings from './components/dashboard/MyBookings';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  const auth = useAuth();
  
  // If auth is not available yet, show loading
  if (!auth) {
    return <LoadingSpinner message="Loading application..." />;
  }

  const { isAuthenticated, user, loading } = auth;

  if (loading) {
    return <LoadingSpinner message="Loading application..." />;
  }

  return (
    <div className="app">
      <Navbar />
      
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="home-page">
              <div className="hero-section">
                <h1>Find Your Perfect Parking Spot</h1>
                <p>Secure, affordable garage spaces near you</p>
                <SearchBar />
              </div>
              
              <div className="features-section">
                <h2>Why Choose GarageReserve?</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <span className="feature-icon">🔒</span>
                    <h3>Secure Parking</h3>
                    <p>All garages are verified and secure</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">💰</span>
                    <h3>Best Prices</h3>
                    <p>Competitive rates from local hosts</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">📍</span>
                    <h3>Convenient Locations</h3>
                    <p>Find parking wherever you need it</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">⭐</span>
                    <h3>Rated by Users</h3>
                    <p>Real reviews from real customers</p>
                  </div>
                </div>
              </div>

              <div className="cta-section">
                <h2>Ready to find your spot?</h2>
                {!isAuthenticated && (
                  <div className="cta-buttons">
                    <button className="btn btn-primary" onClick={() => window.location.href = '/register'}>
                      Get Started
                    </button>
                    <button className="btn btn-secondary" onClick={() => window.location.href = '/browse'}>
                      Browse Garages
                    </button>
                  </div>
                )}
              </div>
            </div>
          } />

          <Route path="/browse" element={
            <div className="browse-page">
              <div className="search-section">
                <SearchBar />
              </div>
              <GarageList />
            </div>
          } />

          <Route path="/garages/:id" element={<GarageDetails />} />

          {/* Auth Routes */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
          } />

          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          } />

          {/* Protected Routes */}
          <Route path="/book/:id" element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          } />

          <Route path="/booking-confirmation/:id" element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              {user?.role === 'host' ? <HostDashboard /> : <UserDashboard />}
            </ProtectedRoute>
          } />

          <Route path="/bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } />

          <Route path="/my-garages" element={
            <ProtectedRoute allowedRoles={['host']}>
              <HostDashboard />
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={
            <div className="not-found">
              <h2>404 - Page Not Found</h2>
              <p>The page you're looking for doesn't exist.</p>
              <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
                Go Home
              </button>
            </div>
          } />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GarageReserve</h3>
            <p>Your trusted platform for garage reservations</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 GarageReserve. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;