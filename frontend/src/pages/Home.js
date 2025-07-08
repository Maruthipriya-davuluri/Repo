import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Find Your Perfect Rental Car</h1>
            <p>
              Discover a wide range of vehicles for every occasion. 
              From economy cars to luxury vehicles, we have the perfect ride for you.
            </p>
            <div className="hero-buttons">
              <Link to="/cars" className="btn btn-primary">
                Browse Cars
              </Link>
              {!isAuthenticated && (
                <Link to="/signup" className="btn btn-secondary">
                  Get Started
                </Link>
              )}
            </div>
          </div>
          <div className="hero-image">
            <div className="car-placeholder">
              🚗
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Back Section for Authenticated Users */}
      {isAuthenticated && (
        <section className="welcome-back">
          <div className="container">
            <h2>Welcome back, {user?.name}!</h2>
            <div className="quick-actions">
              <Link to="/cars" className="action-card">
                <div className="action-icon">🚗</div>
                <h3>Rent a Car</h3>
                <p>Browse available vehicles</p>
              </Link>
              <Link to="/bookings" className="action-card">
                <div className="action-icon">📋</div>
                <h3>My Bookings</h3>
                <p>View your reservations</p>
              </Link>
              <Link to="/profile" className="action-card">
                <div className="action-icon">👤</div>
                <h3>Profile</h3>
                <p>Manage your account</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Premium Fleet</h3>
              <p>Wide selection of well-maintained vehicles from top brands</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive rates with no hidden fees or charges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Booking</h3>
              <p>Safe and secure online booking with instant confirmation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support for all your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Hit the Road?</h2>
          <p>Book your perfect car today and start your journey</p>
          <Link to="/cars" className="btn btn-primary btn-large">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;