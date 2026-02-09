const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // In a production environment (like when deployed), use the live backend URL.
    return 'https://fullstack-backend-b271.onrender.com';
  } else {
    // In a local development environment, use the local backend URL.
    // Make sure your local backend is running on this port.
    return 'http://localhost:9009';
  }
};

export const API_BASE_URL = getApiBaseUrl();
