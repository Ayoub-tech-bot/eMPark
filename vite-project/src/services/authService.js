// Mock auth service - replace with real API calls
export const login = async (email, password) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock validation
  if (email === 'user@example.com' && password === 'password') {
    return {
      success: true,
      user: {
        id: 1,
        name: 'Ahmed',
        email: 'user@example.com',
        role: 'renter'
      },
      token: 'mock-jwt-token'
    };
  } else if (email === 'host@example.com' && password === 'password') {
    return {
      success: true,
      user: {
        id: 2,
        name: 'Ayoub Host',
        email: 'host@example.com',
        role: 'host'
      },
      token: 'mock-jwt-token'
    };
  } else {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }
};

export const register = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock registration
  return {
    success: true,
    user: {
      id: 3,
      ...userData,
      role: userData.role || 'renter'
    },
    token: 'mock-jwt-token'
  };
};

export const logout = () => {
  // Clear local storage
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};