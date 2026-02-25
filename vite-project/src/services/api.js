import axios from 'axios';

// Vite uses import.meta.env instead of process.env
// Make sure to prefix your env variables with VITE_
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Mock data for development - replace with actual API calls
const MOCK_GARAGES = [
  {
    id: 1,
    title: 'Secure Downtown Parking',
    description: '24/7 secure garage in the heart of downtown',
    address: '123 Main St',
    city: 'New York',
    pricePerDay: 25,
    pricePerHour: 5,
    size: 'medium',
    hasSecurity: true,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 124,
    images: ['https://images.unsplash.com/photo-1590673846749-2e4117e5c8f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'],
    host: {
      id: 101,
      name: 'John Doe',
      rating: 4.9,
      reviews: 45
    },
    reviews: [
      {
        id: 1,
        userName: 'Alice Johnson',
        rating: 5,
        date: '2024-02-15',
        comment: 'Great location, very secure!'
      },
      {
        id: 2,
        userName: 'Bob Smith',
        rating: 4,
        date: '2024-02-10',
        comment: 'Clean and convenient.'
      }
    ]
  },
  {
    id: 2,
    title: 'Covered Garage Near Airport',
    description: 'Perfect for long-term parking near the airport',
    address: '456 Airport Rd',
    city: 'Los Angeles',
    pricePerDay: 20,
    pricePerHour: 4,
    size: 'large',
    hasSecurity: true,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 89,
    images: ['https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'],
    host: {
      id: 102,
      name: 'Jane Smith',
      rating: 4.7,
      reviews: 32
    },
    reviews: [
      {
        id: 3,
        userName: 'Carol White',
        rating: 5,
        date: '2024-02-12',
        comment: 'Very convenient for airport parking!'
      }
    ]
  },
  {
    id: 3,
    title: 'Residential Garage Space',
    description: 'Safe and quiet residential area parking',
    address: '789 Oak Ave',
    city: 'Chicago',
    pricePerDay: 15,
    pricePerHour: 3,
    size: 'small',
    hasSecurity: false,
    isAvailable: true,
    rating: 4.2,
    reviewCount: 45,
    images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80'],
    host: {
      id: 103,
      name: 'Bob Wilson',
      rating: 4.5,
      reviews: 18
    },
    reviews: []
  }
];

// Search garages
export const searchGarages = async (params) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter mock data based on params
  let filtered = [...MOCK_GARAGES];
  
  if (params?.location) {
    filtered = filtered.filter(g => 
      g.city.toLowerCase().includes(params.location.toLowerCase()) ||
      g.address.toLowerCase().includes(params.location.toLowerCase())
    );
  }
  
  if (params?.vehicleSize) {
    filtered = filtered.filter(g => g.size === params.vehicleSize);
  }
  
  return {
    success: true,
    data: filtered
  };
};

// Get garage details
export const getGarageDetails = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const garage = MOCK_GARAGES.find(g => g.id === parseInt(id));
  
  if (garage) {
    return {
      success: true,
      data: garage
    };
  } else {
    return {
      success: false,
      error: 'Garage not found'
    };
  }
};

// Create booking
export const createBooking = async (bookingData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Validate booking
  if (!bookingData.garageId || !bookingData.startDate || !bookingData.endDate) {
    return {
      success: false,
      error: 'Missing required fields'
    };
  }
  
  return {
    success: true,
    data: {
      id: Math.floor(Math.random() * 1000),
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }
  };
};

// Get user bookings
export const getUserBookings = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    success: true,
    data: [
      {
        id: 1,
        garageId: 1,
        garageTitle: 'Secure Downtown Parking',
        image: MOCK_GARAGES[0].images[0],
        startDate: '2024-03-15',
        endDate: '2024-03-20',
        totalPrice: 125,
        status: 'confirmed'
      },
      {
        id: 2,
        garageId: 2,
        garageTitle: 'Covered Garage Near Airport',
        image: MOCK_GARAGES[1].images[0],
        startDate: '2024-04-01',
        endDate: '2024-04-05',
        totalPrice: 80,
        status: 'pending'
      },
      {
        id: 3,
        garageId: 3,
        garageTitle: 'Residential Garage Space',
        image: MOCK_GARAGES[2].images[0],
        startDate: '2024-02-01',
        endDate: '2024-02-05',
        totalPrice: 60,
        status: 'completed'
      }
    ]
  };
};

export default api;