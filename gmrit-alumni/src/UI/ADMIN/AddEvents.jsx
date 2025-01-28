import React, { useState } from 'react';
import axios from 'axios';

const AddEvents = () => {
  const [formData, setFormData] = useState({
    event_title: '',
    event_desc: '',
    event_start_date: '',
    event_end_date: '',
    event_start_day: '',
    event_duration: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/add/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies with the request
        body: JSON.stringify(formData), // Convert formData to JSON string
      });
  
      if (response.ok) { // Check if the response status is in the range of 200-299
        alert('Event added successfully!');
        setFormData({
          event_title: '',
          event_desc: '',
          event_start_date: '',
          event_end_date: '',
          event_start_day: '',
          event_duration: '',
        });
      } else {
        // Handle error response
        const errorData = await response.json();
        alert('Failed to add event: ' + (errorData.message || 'An unknown error occurred.'));
      }
    } catch (error) {
      console.error('Error adding event', error);
      alert('Failed to add event');
    }
  };
  

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium">Event Title:</label>
          <input
            type="text"
            name="event_title"
            value={formData.event_title}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Description:</label>
          <textarea
            name="event_desc"
            value={formData.event_desc}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Start Date:</label>
          <input
            type="date"
            name="event_start_date"
            value={formData.event_start_date}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event End Date:</label>
          <input
            type="date"
            name="event_end_date"
            value={formData.event_end_date}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Start Day:</label>
          <input
            type="text"
            name="event_start_day"
            value={formData.event_start_day}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Duration:</label>
          <input
            type="text"
            name="event_duration"
            value={formData.event_duration}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;
