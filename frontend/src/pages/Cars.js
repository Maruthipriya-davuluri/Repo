import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cars.css';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    priceMin: '',
    priceMax: '',
    fuelType: '',
    transmission: '',
    seats: ''
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async (filterParams = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filterParams).toString();
      const response = await axios.get(`${API_BASE_URL}/cars?${queryParams}`);
      setCars(response.data.cars || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load cars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});
    fetchCars(activeFilters);
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      priceMin: '',
      priceMax: '',
      fuelType: '',
      transmission: '',
      seats: ''
    });
    fetchCars();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="cars-page">
      <div className="container">
        <div className="cars-header">
          <h1>Available Cars</h1>
          <p>Find the perfect car for your journey</p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <form onSubmit={handleFilterSubmit} className="filters-form">
            <div className="filters-grid">
              <div className="filter-group">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                  placeholder="e.g. Toyota"
                  className="form-control"
                />
              </div>
              
              <div className="filter-group">
                <label>Min Price</label>
                <input
                  type="number"
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handleFilterChange}
                  placeholder="Min price"
                  className="form-control"
                />
              </div>
              
              <div className="filter-group">
                <label>Max Price</label>
                <input
                  type="number"
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handleFilterChange}
                  placeholder="Max price"
                  className="form-control"
                />
              </div>

              <div className="filter-group">
                <label>Fuel Type</label>
                <select
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">All Types</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Transmission</label>
                <select
                  name="transmission"
                  value={filters.transmission}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">All Types</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Seats</label>
                <select
                  name="seats"
                  value={filters.seats}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">Any</option>
                  <option value="2">2 Seats</option>
                  <option value="4">4 Seats</option>
                  <option value="5">5 Seats</option>
                  <option value="7">7 Seats</option>
                  <option value="8">8+ Seats</option>
                </select>
              </div>
            </div>
            
            <div className="filter-actions">
              <button type="submit" className="btn btn-primary">
                Apply Filters
              </button>
              <button type="button" onClick={clearFilters} className="btn btn-secondary">
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Cars Grid */}
        <div className="cars-section">
          {cars.length === 0 ? (
            <div className="no-cars">
              <h3>No cars found</h3>
              <p>Try adjusting your filters or check back later for new arrivals.</p>
            </div>
          ) : (
            <div className="cars-grid">
              {cars.map((car) => (
                <div key={car._id} className="car-card">
                  <div className="car-image">
                    <div className="car-placeholder">🚗</div>
                  </div>
                  
                  <div className="car-info">
                    <h3 className="car-title">
                      {car.brand} {car.model} ({car.year})
                    </h3>
                    
                    <div className="car-details">
                      <div className="detail-item">
                        <span className="label">Fuel:</span>
                        <span className="value">{car.fuelType}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Transmission:</span>
                        <span className="value">{car.transmission}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Seats:</span>
                        <span className="value">{car.seats}</span>
                      </div>
                    </div>
                    
                    <div className="car-price">
                      <span className="price">${car.pricePerDay}</span>
                      <span className="period">/day</span>
                    </div>
                    
                    <div className="car-actions">
                      <Link 
                        to={`/cars/${car._id}`} 
                        className="btn btn-outline btn-small"
                      >
                        View Details
                      </Link>
                      <Link 
                        to={`/book/${car._id}`} 
                        className="btn btn-primary btn-small"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;