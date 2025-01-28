import React, { useEffect, useState } from "react";
import AlumniTable from "./components/AlumniTable";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import lab from '../../assets/clgPlace.jpg';
import Nav from '../Nav';
import TopBar from '../TopBar';
import { useUser } from '../../store/userStore'; // Import the useUser hook

const API_URL = 'http://localhost:3000/api/alumni/all';

const Student = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('ASC'); // Default sort order
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useUser(); // Get user from useUser hook
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        let queryParams = `?page=${page}`;

        if (selectedYear) queryParams += `&passed=${selectedYear}`;
        if (selectedBranch) queryParams += `&branch=${encodeURIComponent(selectedBranch)}`;
        if (selectedLocation) queryParams += `&current_location=${encodeURIComponent(selectedLocation)}`;
        if (searchTerm) queryParams += `&name=${encodeURIComponent(searchTerm)}`;
        if (sortField) queryParams += `&sortField=${sortField}&sortOrder=${sortOrder}`;

        const response = await fetch(`${API_URL}${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        
        setAlumniList(data.alumni);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch alumni data. Please try again later.');
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [searchTerm, selectedYear, selectedBranch, selectedLocation, sortField, sortOrder, page]);

  const handleSearch = () => {
    setPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortField(field);
      setSortOrder('ASC'); // Default to ascending when changing sort field
    }
    setPage(1); // Reset to page 1 on new sort
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  // Render the page only if the user is logged in
  if (!user) {
    return (
      <>
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
  

  return (
    <>
      <Nav />
      <TopBar img={lab} name="Alumni Directory" />
      <div className="py-8 bg-gray-100">
        <header className="text-center container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6 animate-slideInRight">Alumni Directory</h1>
          <p className="text-base md:text-lg text-gray-700 text-center animate-fadeIn">Meet our distinguished alumni who have made a mark in their respective fields.</p>
        </header>
      </div>
      <div className="container mx-auto">
        {/* Search Inputs */}
        <div className="mb-4 mt-11 justify-center grid grid-cols-2 gap-3 md:grid md:grid-cols-3 md:gap-3 lg:flex lg:space-x-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded w-full w-[83%] ml-4 mx-2 sm:w-auto"
            />
            <input
              type="text"
              placeholder="Filter by year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-2 border rounded w-full w-[83%] mr-4 mx-2 sm:w-auto"
            />
            <input
              type="text"
              placeholder="Filter by branch"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="border rounded w-full w-[83%] ml-4 mx-2 sm:w-auto"
            />
            <input
              type="text"
              placeholder="Filter by location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded w-full w-[83%] ml-2 mx-2 sm:w-auto"
            />
            <button
              onClick={handleSearch}
              className="w-[83%] sm:px-4 ml-4 mx-2 py-2 bg-blue-600 text-white rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 sm:w-auto"
            >
              Search
            </button>
          </div>


        {/* Sorting Controls */}
        <div className="mb-4 flex space-x-4 justify-center text-white">
          <button onClick={() => handleSort('name_of_the_alumni')} className="p-2 bg-blue-500
          rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            Sort by Name {sortField === 'name_of_the_alumni' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button onClick={() => handleSort('passed')} className="p-2 bg-blue-500 rounded-lg 
          shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            Sort by Year {sortField === 'passed' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button onClick={() => handleSort('branch')} className="p-2 bg-blue-500 rounded-lg
          shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            Sort by Branch {sortField === 'branch' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <AlumniTable alumniList={alumniList} />
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-gray-300 mr-2"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-gray-300 ml-2"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Student;
