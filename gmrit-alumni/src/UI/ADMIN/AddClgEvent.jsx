import React, { useState } from 'react';
import axios from 'axios';
import Compressor from 'compressorjs';

const AddClgEvent = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postImages, setPostImages] = useState([]);
  const [postDate, setPostDate] = useState('');
  const [postTime, setPostTime] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    // Validating the fields
    if (!postTitle || !postDescription || !postDate || !postTime) {
      setMessage('Please fill out all required fields.');
      return;
    }
    if (postImages.length > 8) {
      setMessage('You can upload a maximum of 8 images.');
      return;
    }

    // Preparing the data to send
    const eventData = {
      post_title: postTitle,
      post_description: postDescription,
      post_images: postImages,
      post_date: postDate,
      post_time: postTime,
    };

    try {
      // Making the POST request
      const response = await axios.post('http://localhost:3000/api/events/add', eventData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage(response.data.message || 'Event added successfully!');
    } catch (error) {
      setMessage('Failed to add event. Please try again.');
    }
  };

  // Handling file input change and compressing images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const compressedImagesPromises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          new Compressor(file, {
            quality: 0.6, // Adjust quality from 0.1 to 1.0 (0.6 is good for compression)
            maxWidth: 800, // Max width for resizing
            maxHeight: 800, // Max height for resizing
            success: (compressedFile) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
              reader.readAsDataURL(compressedFile);
            },
            error: (error) => reject(error),
          });
        })
    );

    // Resolve all promises and set the images in the state
    Promise.all(compressedImagesPromises)
      .then((base64Images) => {
        setPostImages(base64Images);
      })
      .catch((error) => {
        console.error('Error compressing images:', error);
        setMessage('Error compressing images. Please try again.');
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Add College Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">Event Title:</label>
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter event title"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">Event Description:</label>
            <textarea
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter event description"
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">Event Images:</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-sm text-gray-500 mt-1">You can upload up to 8 images.</p>
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">Event Date:</label>
            <input
              type="date"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">Event Time:</label>
            <input
              type="time"
              value={postTime}
              onChange={(e) => setPostTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {message && (
            <p className="text-center text-red-500 mt-4 animate-pulse">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClgEvent;
