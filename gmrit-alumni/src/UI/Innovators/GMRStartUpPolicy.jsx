import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GMRStartupPolicy = () => {
  const navigate = useNavigate();
  const pdfUrl = 'http://115.241.205.4/alumni/Entrepreneurs/GMRITStartupPolicy.pdf'; // Replace with your PDF file URL

  useEffect(() => {
    window.open(pdfUrl, '_blank'); // Open PDF in a new tab

    // Set a timeout to navigate back to /innovators after a short delay
    const timer = setTimeout(() => {
      navigate('/innovators');
    }, 0.001); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return null;
};

export default GMRStartupPolicy;


