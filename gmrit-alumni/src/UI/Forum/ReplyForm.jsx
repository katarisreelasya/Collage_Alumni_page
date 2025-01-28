import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReplyForm = ({ threadId }) => {
  const navigate=useNavigate();
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reply = { content };

    // Post to backend
    await fetch(`http://localhost:3000/api/threads/${threadId}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reply),
      credentials: 'include',
    });

    // Optionally refresh the page or fetch new replies
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Your Reply:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full h-32 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Write your reply here..."
        ></textarea>
      </div>
      <div className='flex justify-center gap-4'>
      <button
            onClick={() => navigate('/forum')} // Navigate to /career_alerts
            className="lg:w-[9vw] w-[100px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 px-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Back
          </button>
      <button
        type="submit"
        className=" py-2 px-4 bg-blue-600 font-semibold text-sm text-white rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Submit Reply
      </button>
      </div>
    </form>
  );
};

export default ReplyForm;
