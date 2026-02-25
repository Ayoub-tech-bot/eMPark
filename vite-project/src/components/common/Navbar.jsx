import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon"></span>
          eMPark
        </Link>

        <div className="nav-links">
          <Link to="/browse" className="nav-link">Browse Garages</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              
              {user?.role === 'host' && (
                <Link to="/my-garages" className="nav-link">My Garages</Link>
              )}
              
              <Link to="/bookings" className="nav-link">My Bookings</Link>
              
              <div className="user-menu">
                <span className="user-name">
                  👤 {user?.name || 'User'}
                </span>
                <button 
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-link login-link">Login</Link>
              <Link to="/register" className="btn btn-primary register-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;