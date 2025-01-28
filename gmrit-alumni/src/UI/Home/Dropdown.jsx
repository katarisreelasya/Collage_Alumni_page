import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Dropdown({ mainheading, subheadings, links, isOpen, toggleDropdown }) {
  const dropdownRef = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className="text-white hover:bg-[rgb(85,132,198)] font-medium rounded-full text-sm px-2.5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={() => toggleDropdown(!isOpen)}
      >
        {mainheading}
        <svg
          className="w-2.5 h-2.5 ml-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2">
          <ul className="py-1 text-sm text-center">
            {subheadings.map((subheading, index) => (
              <li key={index}>
                <Link
                  to={links[index]}
                  className="block py-1 bg-white hover:bg-blue-100 text-[#00327a] rounded"
                  onClick={() => toggleDropdown(false)} // Close dropdown on option click
                >
                  {subheading}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;