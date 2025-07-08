import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name}! Manage your car rental business from here.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div className="card">
          <div className="card-header">
            <h3>Manage Cars</h3>
          </div>
          <div className="card-body">
            <p>Add, edit, or remove cars from your fleet.</p>
            <button className="btn btn-primary">Manage Cars</button>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Manage Bookings</h3>
          </div>
          <div className="card-body">
            <p>View and manage all customer bookings.</p>
            <button className="btn btn-primary">Manage Bookings</button>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Manage Users</h3>
          </div>
          <div className="card-body">
            <p>View and manage registered users.</p>
            <button className="btn btn-primary">Manage Users</button>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Reports</h3>
          </div>
          <div className="card-body">
            <p>View business analytics and reports.</p>
            <button className="btn btn-primary">View Reports</button>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Admin Features Coming Soon!</h3>
        <p>Full admin functionality will be available in the next update.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;