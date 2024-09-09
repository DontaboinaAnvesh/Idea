import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthProvider and useAuth for authentication
import './App.css'; // Ensure you have global styles here
import Header from './Components/Header';
import Home from './Components/Home';
import IdeasSubmit from './Components/IdeasSubmit';
import IdeasGallery from './Components/IdeasGallery';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider for authentication */}
      <Router>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              {/* Default route set to login */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ideas-submit" 
                element={
                  <ProtectedRoute>
                    <IdeasSubmit />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ideas-gallery" 
                element={
                  <ProtectedRoute>
                    <IdeasGallery />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                } 
              />

              {/* Redirect any unknown route to login */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
