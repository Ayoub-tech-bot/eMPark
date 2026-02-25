import React, { createContext, useState, useContext } from 'react';
import { searchGarages, getGarageDetails, createBooking } from '../services/api';

const GarageContext = createContext(null);

export const useGarages = () => {
  const context = useContext(GarageContext);
  if (!context) {
    throw new Error('useGarages must be used within a GarageProvider');
  }
  return context;
};

export const GarageProvider = ({ children }) => {
  const [garages, setGarages] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    location: '',
    startDate: '',
    endDate: '',
    vehicleSize: 'medium'
  });

  const fetchGarages = async (params = searchParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchGarages(params);
      
      if (response.success) {
        setGarages(response.data);
        setSearchParams(params);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to fetch garages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGarageDetails = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGarageDetails(id);
      
      if (response.success) {
        setSelectedGarage(response.data);
        return response.data;
      } else {
        setError(response.error);
        return null;
      }
    } catch (err) {
      setError('Failed to fetch garage details.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const bookGarage = async (bookingData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createBooking(bookingData);
      
      if (response.success) {
        return { success: true, booking: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Booking failed. Please try again.');
      return { success: false, error: 'Booking failed' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    garages,
    selectedGarage,
    loading,
    error,
    searchParams,
    fetchGarages,
    fetchGarageDetails,
    bookGarage,
    setSearchParams
  };

  return (
    <GarageContext.Provider value={value}>
      {children}
    </GarageContext.Provider>
  );
};