import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartupsIncubated = () => {
  const navigate = useNavigate();
  const pdfUrl = 'http://115.241.205.4/alumni/Entrepreneurs/Startups_Incubated.pdf'; // Replace with your PDF file URL

  useEffect(() => {
    // Open the PDF in a new tab
    const pdfWindow = window.open(pdfUrl, '_blank');

    // Check if the new window was successfully created
    if (pdfWindow) {
      pdfWindow.focus(); // Bring the new tab to the foreground
    }

    // Redirect to /innovators after a short delay
    const timer = setTimeout(() => {
      navigate('/innovators');
    }, 0.001); // Set delay to 0 to redirect immediately

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate, pdfUrl]);

  return null; // No need to render anything in this component
};

export default StartupsIncubated;
