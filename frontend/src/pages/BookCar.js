import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BookCar = () => {
  const { id } = useParams();

  return (
    <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1>Book Car</h1>
      <p>Booking form for car ID: {id}</p>
      <p>This feature is coming soon!</p>
      <Link to={`/cars/${id}`} className="btn btn-secondary" style={{ marginRight: '10px' }}>
        Back to Car Details
      </Link>
      <Link to="/cars" className="btn btn-primary">
        Browse All Cars
      </Link>
    </div>
  );
};

export default BookCar;