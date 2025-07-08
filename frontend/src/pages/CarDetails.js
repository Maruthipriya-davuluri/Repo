import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/cars/${id}`);
      setCar(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching car details:', error);
      setError('Failed to load car details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading car details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="alert alert-error">
          {error}
        </div>
        <Link to="/cars" className="btn btn-primary">
          Back to Cars
        </Link>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Car not found</h2>
        <Link to="/cars" className="btn btn-primary">
          Back to Cars
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="card">
        <div className="card-header">
          <h1>{car.brand} {car.model} ({car.year})</h1>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <p><strong>Brand:</strong> {car.brand}</p>
              <p><strong>Model:</strong> {car.model}</p>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Color:</strong> {car.color}</p>
              <p><strong>License Plate:</strong> {car.licensePlate}</p>
            </div>
            <div>
              <p><strong>Fuel Type:</strong> {car.fuelType}</p>
              <p><strong>Transmission:</strong> {car.transmission}</p>
              <p><strong>Seats:</strong> {car.seats}</p>
              <p><strong>Price per Day:</strong> ${car.pricePerDay}</p>
              <p><strong>Available:</strong> {car.availability ? 'Yes' : 'No'}</p>
            </div>
          </div>
          
          {car.description && (
            <div style={{ marginBottom: '20px' }}>
              <h3>Description</h3>
              <p>{car.description}</p>
            </div>
          )}
          
          {car.features && car.features.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3>Features</h3>
              <ul>
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="card-footer">
          <Link to="/cars" className="btn btn-secondary" style={{ marginRight: '10px' }}>
            Back to Cars
          </Link>
          {car.availability && (
            <Link to={`/book/${car._id}`} className="btn btn-primary">
              Book This Car
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;