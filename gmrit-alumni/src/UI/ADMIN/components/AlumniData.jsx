import React, { useEffect, useState } from "react";
import AlumniTable from "./AlumniTable";

const API_URL = 'http://localhost:3000/api/alumni/all';

const AlumniData = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('ASC'); // Default sort order
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        let queryParams = `?page=${page}`;

        if (selectedYear) queryParams += `&passed=${selectedYear}`;
        if (selectedBranch) queryParams += `&branch=${encodeURIComponent(selectedBranch)}`;
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
  }, [searchTerm, selectedYear, selectedBranch, sortField, sortOrder, page]);

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

  const handleDelete = async (login_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this alumni?");
    if (!confirmDelete) return;

    try {
      // Send DELETE request to the backend API
      const response = await fetch(`http://localhost:5000/api/alumni/${login_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove alumni from the frontend list after a successful deletion
        setAlumniList((prevAlumniList) =>
          prevAlumniList.filter((alumni) => alumni.login_id !== login_id)
        );
        alert("Alumni deleted successfully");
      } else {
        alert("Failed to delete alumni");
      }
    } catch (error) {
      console.error("Error deleting alumni:", error);
      alert("Error deleting alumni");
    }
  };

  // Edit alumni record via API request
  const handleEdit = async (updatedAlumni) => {
    try {
      // Send PUT request to the backend API
      const response = await fetch(`http://localhost:5000/api/alumni/${updatedAlumni.login_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedAlumni),
      });

      if (response.ok) {
        // Update the alumni list after successful edit
        setAlumniList((prevAlumniList) =>
          prevAlumniList.map((alumni) =>
            alumni.login_id === updatedAlumni.login_id ? updatedAlumni : alumni
          )
        );
        alert("Alumni updated successfully");
      } else {
        alert("Failed to update alumni");
      }
    } catch (error) {
      console.error("Error updating alumni:", error);
      alert("Error updating alumni");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl font-bold">Alumni Data</h1>
        {/* Search Inputs */}
        <div className="mb-4 flex space-x-4 mt-11 justify-center">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filter by year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filter by branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="p-2 border rounded"
          />
          <button onClick={handleSearch} className="p-2 px-4 bg-blue-600 text-white
          rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
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
  );
};

export default AlumniData;
