import React, { useState } from 'react';
import Nav from '../Nav';
import { useNavigate } from 'react-router-dom';

const CreateThread = () => {
  const navigate = useNavigate(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const thread = { title, content };

    // Post to backend
    await fetch('http://localhost:3000/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thread),
      credentials: 'include',
    });

    // Redirect to the thread list
    // window.location.href = '/';
  };

  return (
    <div className='h-screen'>
      <Nav/>
    <div className=" bg-gradient-to-r from-white to-gray-100 p-6 flex items-center justify-center mt-14 lg:mt-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create New Thread
        </h2>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          ></textarea>
        </div>

        <div className="flex justify-center gap-4">
          {/* Back button to navigate to career alerts */}
          <button
            onClick={() => navigate('/forum')} // Navigate to /career_alerts
            className="lg:w-[9vw] w-[100px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 px-3 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Back
          </button>
        <button
          type="submit"
          className="lg:w-[9vw] w-[100px] py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateThread;
