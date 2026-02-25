// src/components/garages/GarageList.jsx
import React, { useState, useEffect } from 'react';
import GarageCard from './GarageCard';
import './GarageList.css';

const GarageList = ({ searchParams }) => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price_asc');
  const [currentPage, setCurrentPage] = useState(1);
  const garagesPerPage = 9;

  // Mock data for development - replace with actual API call
  useEffect(() => {
    const fetchGarages = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockGarages = [
          {
            id: 1,
            title: "Secure Downtown Garage",
            address: "123 Main St",
            city: "New York",
            size: "medium",
            pricePerDay: 25,
            pricePerHour: 5,
            hasSecurity: true,
            isAvailable: true,
            rating: 4.8,
            reviewCount: 24,
            images: ["/images/garage1.jpg"]
          },
          {
            id: 2,
            title: "Covered Parking Space",
            address: "456 Oak Ave",
            city: "Los Angeles",
            size: "large",
            pricePerDay: 20,
            pricePerHour: 4,
            hasSecurity: false,
            isAvailable: true,
            rating: 4.2,
            reviewCount: 15,
            images: []
          },
          {
            id: 3,
            title: "24/7 Security Garage",
            address: "789 Pine St",
            city: "Chicago",
            size: "small",
            pricePerDay: 30,
            pricePerHour: 6,
            hasSecurity: true,
            isAvailable: false,
            rating: 4.9,
            reviewCount: 42,
            images: ["/images/garage3.jpg"]
          }
        ];

        setGarages(mockGarages);
        setError(null);
      } catch (err) {
        setError('Failed to load garages. Please try again.');
        console.error('Error fetching garages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGarages();
  }, [searchParams]); // Re-fetch when search params change

  // Sorting function
  const sortGarages = (garagesToSort) => {
    switch (sortBy) {
      case 'price_asc':
        return [...garagesToSort].sort((a, b) => a.pricePerDay - b.pricePerDay);
      case 'price_desc':
        return [...garagesToSort].sort((a, b) => b.pricePerDay - a.pricePerDay);
      case 'rating_desc':
        return [...garagesToSort].sort((a, b) => b.rating - a.rating);
      default:
        return garagesToSort;
    }
  };

  // Pagination
  const indexOfLastGarage = currentPage * garagesPerPage;
  const indexOfFirstGarage = indexOfLastGarage - garagesPerPage;
  const currentGarages = sortGarages(garages).slice(indexOfFirstGarage, indexOfLastGarage);
  const totalPages = Math.ceil(garages.length / garagesPerPage);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Searching for available garages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="garage-list-container">
      <div className="list-header">
        <h2>{garages.length} Garages Available</h2>
        
        <div className="sort-controls">
          <label htmlFor="sort">Sort by:</label>
          <select 
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Highest Rated</option>
          </select>
        </div>
      </div>

      {garages.length === 0 ? (
        <div className="no-results">
          <p>No garages found matching your criteria.</p>
          <p>Try adjusting your search filters.</p>
        </div>
      ) : (
        <>
          <div className="garages-grid">
            {currentGarages.map(garage => (
              <GarageCard key={garage.id} garage={garage} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="page-btn"
              >
                Previous
              </button>
              
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GarageList;