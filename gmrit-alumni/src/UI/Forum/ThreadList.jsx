import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav';
import { useUser } from '../../store/userStore';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const {user} = useUser();
  useEffect(() => {
    // Fetch threads from backend
    fetch('http://localhost:3000/api/threads', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setThreads(data));
  }, []);



  return (
    user?(
    <div>
      <Nav />
      
        <div className="min-h-screen bg-gray-200 p-6"> {/* Change to a lighter gray for contrast */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"> {/* White background for the main content */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Forum Discussions
          </h1>
          <div className="flex justify-center mb-6">
            <Link
              to="/forum/create-thread"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-base font-semibold rounded-full hover:from-purple-500 hover:to-blue-500 transition duration-200"
            >
              Start a New Discussion
            </Link>
          </div>
          <ul className="space-y-6">
            {threads.map((thread) => (
              <li
                key={thread.thread_id}
                className="bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Link
                  to={`/forum/threads/${thread.thread_id}`}
                  className="text-xl font-semibold text-black-600 hover:text-blue-500 transition-colors"
                >
                  {thread.title}
                </Link>
                <p className="text-sm text-gray-600 mt-2">
                  Posted on: {new Date(thread.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    ):<>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-700 mb-6">
            You need to be logged in to access this resource. Please login to
            continue.
          </p>
          <button
            // Assuming you have a login page route
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Link to={'/login'}>Login</Link>
          </button>
        </div>
      </div>
      </>
  );
            }

export default ThreadList;
