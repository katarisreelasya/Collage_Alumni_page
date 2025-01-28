import React, { useState } from 'react';
import axios from 'axios';

const CsvUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a CSV file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/alumni/add/csv',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        setMessage(response.data.message); // Success message from server
        alert('Data added successfully!');
      } else {
        setMessage('Error uploading file: ' + (response.data.error || 'Unknown error.'));
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || error.message || 'An unknown error occurred';
      setMessage('Error uploading file: ' + errorMsg);
    }
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Alumni CSV</h1>
      <p className="mb-4">
        Please upload a CSV file with the following fields:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>s_no (Auto-incremented)</li>
        <li>login_id (required)</li>
        <li>name_of_the_alumni</li>
        <li>gender</li>
        <li>course</li>
        <li>branch</li>
        <li>dob</li>
        <li>passed</li>
        <li>address</li>
        <li>state</li>
        <li>country</li>
        <li>zipcode</li>
        <li>phone_no</li>
        <li>mail_id</li>
        <li>dor</li>
        <li>parent_number</li>
        <li>company</li>
        <li>designation</li>
        <li>dept</li>
        <li>PHONE</li>
        <li>MAIL</li>
        <li>current_location</li>

      </ul>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default CsvUpload;
