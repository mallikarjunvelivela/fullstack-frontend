import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaUserCircle, FaCamera, FaUpload } from 'react-icons/fa';
import { API_BASE_URL } from '../apiConfig';

export default function Account() {
  const { auth, login } = useContext(AuthContext);
  const user = auth.user;

  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleClose = () => {
    setShowModal(false);
    stopCamera();
    setPreview(null);
    setSelectedFile(null);
  };
  const handleShow = () => setShowModal(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setIsCameraOpen(false);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    setPreview(null);
    setSelectedFile(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please allow camera permissions.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      canvas.toBlob(blob => {
        const file = new File([blob], "profile_capture.jpg", { type: "image/jpeg" });
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        stopCamera();
      }, 'image/jpeg');
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    // Replace these with your actual Cloudinary credentials
    const cloudName = "dahmepwyc"; 
    const uploadPreset = "website-images";

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", uploadPreset);

    try {
      // 1. Upload image to Cloudinary
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
        headers: {
          Authorization: null
        }
      });
      const imageUrl = response.data.secure_url;
      // 2. Send the image URL to your backend (Update user profile)
      await axios.put(`/user/${user.id}`, { ...user, image: imageUrl });

      // 3. Fetch updated user data and update context to reflect changes in UI
      const result = await axios.get(`/user/${user.id}`);
      login(auth.token, result.data);

      handleClose();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  if (!user) {
    // This should ideally not happen if the route is protected, but as a fallback
    return <p>Loading user data...</p>;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2 border rounded p-4 mt-4 shadow'>
          <h2 className='text-center m-4'>My Account</h2>
          
          <div className="text-center mb-4">
            <div 
              style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }} 
              onClick={handleShow}
              title="Click to update profile picture"
            >
              {user.image ? (
                <img 
                  src={user.image.startsWith('http') ? user.image : `${API_BASE_URL}/user/${user.id}/image?t=${user.image}`} 
                  alt="Profile" 
                  className="rounded-circle border" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                />
              ) : (
                <FaUserCircle size={150} className="text-secondary" />
              )}
              <div 
                className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2"
                style={{ transform: 'translate(10%, 10%)' }}
              >
                <FaCamera size={20} />
              </div>
            </div>
          </div>

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

      {/* Profile Image Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {!isCameraOpen && !preview && (
            <div className="d-grid gap-3">
              <Button variant="outline-primary" size="lg" onClick={() => document.getElementById('fileInput').click()}>
                <FaUpload className="me-2" /> Upload Photo
              </Button>
              <input 
                type="file" 
                id="fileInput" 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              <Button variant="outline-secondary" size="lg" onClick={startCamera}>
                <FaCamera className="me-2" /> Take Photo
              </Button>
            </div>
          )}

          {isCameraOpen && (
            <div>
              <div className="mb-3 bg-black rounded overflow-hidden" style={{ maxHeight: '300px' }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <Button variant="success" onClick={capturePhoto}>Capture</Button>
              <Button variant="secondary" className="ms-2" onClick={stopCamera}>Cancel</Button>
            </div>
          )}

          {preview && (
            <div>
              <div className="mb-3">
                <img src={preview} alt="Preview" className="img-fluid rounded-circle" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
              </div>
              <div className="d-flex justify-content-center gap-2">
                <Button variant="secondary" onClick={() => { setPreview(null); setSelectedFile(null); }}>Retake/Select</Button>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!selectedFile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}