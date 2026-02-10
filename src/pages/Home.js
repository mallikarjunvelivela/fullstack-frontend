import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Carousel } from 'react-bootstrap';

export default function Home() {
  const { auth } = useContext(AuthContext);

  return (
    <div className='container-fluid p-0'>
      {/* Carousel Section */}
      <Carousel id="homeCarousel" interval={3000}>
        <Carousel.Item>
          <img
            src="https://picsum.photos/id/10/1200/500"
            className="d-block w-100"
            alt="Welcome"
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h1>Welcome to User Management System</h1>
            <p>Efficiently manage your users and data with our fullstack solution.</p>
            {!auth.user && <Link to="/signup" className="btn btn-primary mt-3">Sign Up Now</Link>}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://picsum.photos/id/11/1200/500"
            className="d-block w-100"
            alt="Secure"
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h1>Secure & Reliable</h1>
            <p>Built with security in mind to protect your sensitive information.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://picsum.photos/id/12/1200/500"
            className="d-block w-100"
            alt="Easy"
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h1>Easy to Use</h1>
            <p>User-friendly interface designed for the best experience.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* About Section */}
      <div className="container my-5">
        <div className="p-4 pb-0 pe-lg-0 pt-lg-5 rounded-3 border shadow-lg">
          <div className="row align-items-center">
            <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
              <h1 className="display-4 fw-bold lh-1">About Our Platform</h1>
              <p className="lead">
                This Fullstack Application is designed to demonstrate CRUD operations, Authentication, and User Management. 
                It leverages the power of React for a dynamic frontend and a robust backend APIs.
              </p>
            </div>
            <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                <img className="d-block w-100" src="https://picsum.photos/id/20/400/300" alt="About Us" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Our Features</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <h2>User Management</h2>
            <p>Comprehensive tools to add, update, and manage user profiles seamlessly.</p>
            <Link to="/allusers" className="btn btn-outline-primary loader">Go to Users</Link>
          </div>
          <div className="feature col">
            <h2>Authentication</h2>
            <p>Secure login and registration flows to ensure data privacy and access control.</p>
          </div>
          <div className="feature col">
            <h2>Performance</h2>
            <p>Optimized for speed and efficiency, providing a smooth user experience.</p>
          </div>
        </div>
      </div>
    </div>
  )
}