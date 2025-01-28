import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SideBar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [alumniRequestsCount, setAlumniRequestsCount] = useState(0);

  useEffect(() => {
    // Fetch alumni requests count
    const fetchAlumniRequestsCount = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/alumni/requests/count', {
          withCredentials: true,
        });
        setAlumniRequestsCount(data.alumniRequestsCount);
      } catch (error) {
        console.error('Error fetching alumni requests count:', error);
      }
    };

    fetchAlumniRequestsCount();
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Logged out and cookie cleared');
        navigate('/Admin/Login');
        window.location.reload();
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full lg:w-[20vw] w-[50vw] bg-gray-800 text-white p-6 z-50 shadow-lg transition-transform duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:w-[20vw]`}
    >
      <button
        className="block lg:hidden text-yellow-400 text-2xl mb-4"
        onClick={toggleSidebar}
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-700">
        Admin Dashboard
      </h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/Admin"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="alumni_requests"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300"
            >
              <p className="hover:text-yellow-400">Alumni Requests</p>
              <span className="rounded-full bg-yellow-400 text-white ml-2 px-2 text-center">
                {alumniRequestsCount}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="Alumni_Data"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Alumni Data
            </Link>
          </li>
          <li>
            <Link
              to="Job_Notifications"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Job Notifications
            </Link>
          </li>
          <li>
            <Link
              to="events"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="view_meets"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Meets
            </Link>
          </li>
          <li>
            <Link
              to="View_webinar"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Webinar
            </Link>
          </li>
          <li>
            <Link
              to="View_honoured_alumni"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Honoured Alumni
            </Link>
          </li>
          <li>
            <Link
              to="View_Posts"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              College Posts
            </Link>
          </li>
          <li>
            <Link
              to="Add_Alumni"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Add Alumni
            </Link>
          </li>
          <li>
            <Link
              to="Add_Alumni_csv"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Add Alumni via CSV Upload
            </Link>
          </li>
          <li>
            <Link
              to="Add_Job_Notifications"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Add Job Notifications
            </Link>
          </li>
          <li>
            <Link
              to="add_events"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Add Events
            </Link>
          </li>
          <li>
            <Link
              to="add_meets"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Add Meets
            </Link>
          </li>
          <li>
            <Link
              to="add_webinar"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Add Webinar
            </Link>
          </li>
          <li>
            <Link
              to="add_honoured_alumni"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Add Honoured Alumni
            </Link>
          </li>
          <li>
            <Link
              to="add_posts"
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300"
            >
              Add Posts
            </Link>
          </li>
          <li>
            <div
              onClick={handleLogout}
              className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
            >
              Logout
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
