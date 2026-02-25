import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';  // This should import your global styles
import { AuthProvider } from './context/AuthContext';
import { GarageProvider } from './context/GarageContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GarageProvider>
          <App />
        </GarageProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);