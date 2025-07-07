import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Bookings = () => {
  const { user } = useAuth();

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1>My Bookings</h1>
      <p>Welcome, {user?.name}! Here you can view your booking history.</p>
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-body" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No bookings yet</h3>
          <p>You haven't made any bookings yet. Start exploring our available cars!</p>
          <a href="/cars" className="btn btn-primary">
            Browse Cars
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bookings;