// src/components/AlumniRequests.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlumniRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/requests', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        console.log('Fetched requests:', data);

        if (data.requests) {
          setRequests(data.requests);
        } else {
          console.error('No requests found in the response');
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleViewClick = (requestId) => {
    navigate(`/Admin/request/${requestId}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-5 max-w-2xl bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center mb-5 text-xl font-bold text-gray-800">Alumni Requests</h2>
      <table className="w-full border-collapse mt-2 border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left border border-gray-300 bg-blue-500 text-white">Login ID</th>
            <th className="px-4 py-3 text-left border border-gray-300 bg-blue-500 text-white">Name of Alumni</th>
            <th className="px-4 py-3 text-left border border-gray-300 bg-blue-500 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.request_id} className="hover:bg-gray-200 cursor-pointer">
                <td className="px-4 py-3 border border-gray-300">{request.jntu_id}</td>
                <td className="px-4 py-3 border border-gray-300">{request.name_of_the_alumni}</td>
                <td className="px-4 py-3 border border-gray-300">
                  <button
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                    onClick={() => handleViewClick(request.request_id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">No requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlumniRequests;
