import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { auth, logout, website } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/signin'); // Redirect to login page after sign out
  };


  return (
    <div>
        <nav 
          className="navbar navbar-expand-lg navbar-dark" 
          style={{ backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{website.name}</Link>
                <div>
                  {auth.user ? (
                    <>
                      <span className="navbar-text text-white me-3">
                        Welcome, <Link to="/account" className="text-white" style={{ textDecoration: 'none' }}>{auth.user.name}</Link>
                      </span>
                      <button className="btn btn-outline-light" onClick={handleSignOut}>Sign Out</button>
                    </>
                  ) : (
                    <Link className="btn btn-outline-light" to="/signin">Sign In</Link>
                  )}
                </div>
            </div>
        </nav>
    </div>
  )
}
