import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          🚗 CarRental
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-nav">
            <Link to="/" className="navbar-link" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/cars" className="navbar-link" onClick={closeMobileMenu}>
              Cars
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="navbar-link" onClick={closeMobileMenu}>
                  My Bookings
                </Link>
                <Link to="/profile" className="navbar-link" onClick={closeMobileMenu}>
                  Profile
                </Link>
                {user && user.role === 'admin' && (
                  <Link to="/admin" className="navbar-link admin-link" onClick={closeMobileMenu}>
                    Admin Dashboard
                  </Link>
                )}
                <div className="navbar-user">
                  <span className="user-name">Hi, {user?.name}</span>
                  <button className="btn-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="navbar-link" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/signup" className="btn-signup" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;