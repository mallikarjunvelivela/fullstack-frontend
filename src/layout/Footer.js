import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

export default function Footer() {
  const { website } = useContext(AuthContext);

  return (
    <footer className="text-center text-lg-start text-white mt-auto" style={{ backgroundColor: '#764ba2' }}>
      <div className="container pt-2 pb-2">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white me-4">
              <FaLinkedin size="1.5em" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaInstagram size="1.5em" />
            </a>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end">
            <Link to="/privacy-policy" className="text-white me-4" style={{ textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="text-white" style={{ textDecoration: 'none' }}>Terms & Conditions</Link>
          </div>
        </div>
      </div>

      <div className="text-center p-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Copyright: {website.name}
      </div>
    </footer>
  );
}