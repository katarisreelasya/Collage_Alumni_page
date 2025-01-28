import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track sidebar visibility

  const handleMenuClick = (link) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
      setTimeout(() => {
        window.location.href = '/innovators';
      }, 0);
    }
  };

  const menuItems = [
    { id: 1, name: 'Overview', link: '/innovators/overview' },
    { id: 2, name: 'NISP Startup Policy', link: '/innovators/nisp_startup_policy' },
    { id: 3, name: 'Andhra Pradesh Startup Policy', link: '/innovators/ap_startup_policy' },
    { id: 4, name: 'GMRIT Startup Policy', link: '/innovators/gmrit_startup_policy' },
    { id: 6, name: 'Startups Incubated', link: '/innovators/startups_incubated' },
    { id: 7, name: 'Successful Entrepreneurs', link: '/innovators/successful_entrepreneurs' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Menu button for small screens */}
      <div className="block lg:hidden p-4">
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-[60vw] md:w-[40vw] lg:w-[20vw] bg-blue-50 p-6 my-10 mt-[60px] sm:mt-8 m-3 fixed top-0 z-50 lg:translate-x-0 lg:relative lg:block transition-transform duration-300 ease-in-out rounded`}
      >
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.link}
                className="block bg-white p-4 rounded-lg shadow transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                onClick={(e) => {
                  if (item.link.startsWith('http')) {
                    e.preventDefault();
                    handleMenuClick(item.link);
                  }
                  // Close menu on small screen after clicking a link
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="text-gray-800 font-semibold">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FloatingMenu;
