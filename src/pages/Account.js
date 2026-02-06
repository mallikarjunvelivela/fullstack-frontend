import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Account() {
  const { auth } = useContext(AuthContext);
  const user = auth.user;

  if (!user) {
    // This should ideally not happen if the route is protected, but as a fallback
    return <p>Loading user data...</p>;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2 border rounded p-4 mt-4 shadow'>
          <h2 className='text-center m-4'>My Account</h2>
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title'>User Details</h5>
            </div>
            <div className='card-body'>
              <p className='card-text'><strong>Name:</strong> {user.name}</p>
              <p className='card-text'><strong>Username:</strong> {user.username}</p>
              <p className='card-text'><strong>Email:</strong> {user.email}</p>
              <p className='card-text'><strong>Mobile Number:</strong> {user.mobileNumber}</p>
            </div>
          </div>

          {auth.user.role === 'Admin' && (
            <div className='text-center mt-4'>
              <Link className='btn btn-primary' to="/allusers">View All Users</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}