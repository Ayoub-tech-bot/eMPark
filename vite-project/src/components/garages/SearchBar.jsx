import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGarages } from '../../context/GarageContext';
import './SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const { setSearchParams, fetchGarages } = useGarages();
  
  const [searchData, setSearchData] = useState({
    location: '',
    startDate: '',
    endDate: '',
    vehicleSize: 'medium'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const vehicleSizes = [
    { value: 'small', label: 'Small Car' },
    { value: 'medium', label: 'Medium Car' },
    { value: 'large', label: 'Large Car' },
    { value: 'suv', label: 'SUV' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update context and fetch garages
    setSearchParams(searchData);
    fetchGarages(searchData);
    
    // Navigate to browse page
    navigate('/browse');
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-inputs">
          <div className="search-input-group">
            <label htmlFor="location">📍 Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter city or address"
              value={searchData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="search-input-group">
            <label htmlFor="startDate">📅 Check-in</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={searchData.startDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="search-input-group">
            <label htmlFor="endDate">📅 Check-out</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={searchData.endDate}
              onChange={handleInputChange}
              min={searchData.startDate}
              required
            />
          </div>

          <div className="search-input-group">
            <label htmlFor="vehicleSize">🚗 Vehicle Size</label>
            <select
              id="vehicleSize"
              name="vehicleSize"
              value={searchData.vehicleSize}
              onChange={handleInputChange}
            >
              {vehicleSizes.map(size => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="search-button">
          Search Garages
        </button>

        <button 
          type="button" 
          className="advanced-toggle"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? '− Hide' : '+ More'} Filters
        </button>
      </form>

      {showAdvanced && (
        <div className="advanced-filters">
          <h4>Advanced Filters</h4>
          
          <div className="filter-row">
            <label>Price Range (per day)</label>
            <div className="price-range">
              <input
                type="number"
                placeholder="Min DH"
                min="0"
                className="price-input"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max DH"
                min="0"
                className="price-input"
              />
            </div>
          </div>

          <div className="filter-row">
            <label>Features</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" /> 24/7 Security
              </label>
              <label className="checkbox-label">
                <input type="checkbox" /> Covered Parking
              </label>
              <label className="checkbox-label">
                <input type="checkbox" /> EV Charging
              </label>
              <label className="checkbox-label">
                <input type="checkbox" /> CCTV
              </label>
            </div>
          </div>

          <div className="filter-row">
            <label>Rating</label>
            <select className="rating-select">
              <option value="">Any</option>
              <option value="4.5">4.5+ stars</option>
              <option value="4">4+ stars</option>
              <option value="3.5">3.5+ stars</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;