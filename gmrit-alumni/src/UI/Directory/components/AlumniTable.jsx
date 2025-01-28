import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../store/userStore";
import axios from "axios";

const AlumniTable = ({ alumniList = [] }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const loginId = user.login_id; // Get the logged-in user's ID

  const handleViewClick = (loginId) => {
    navigate(`/alumni/${loginId}`);
  };

  const handleAddFriendClick = async (friendId) => {
    const confirmAdd = window.confirm("Do you want to add this alumni as a friend?");
    if (!confirmAdd) return;
  
    try {
      const response = await fetch("http://localhost:3000/api/add_friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ friend_id: friendId }),
        credentials: "include", // Send cookies for authentication
      });
  
      if (!response.ok) {
        // If response status is not OK, throw an error
        const errorText = await response.text(); // Get raw response as text
        console.error('Error:', errorText); // Log the raw error message
        throw new Error(errorText); // Throw error with raw response
      }
  
      const data = await response.json(); // Assuming a valid JSON response
      alert(data.message); // Success response
    } catch (error) {
      console.error("Error adding friend:", error);
      alert(error.message || "Error adding friend");
    }
  };
  

  return (
    <div className="container mx-auto my-5 px-4 sm:px-2">
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gray-200 text-blue-800 text-lg">
            <tr>
              <th className="border border-gray-300 px-2 py-2 text-center">Name</th>
              <th className="border border-gray-300 px-2 py-2 text-center">Branch</th>
              <th className="border border-gray-300 px-2 py-2 text-center">Passed</th>
              <th className="border border-gray-300 px-2 py-2 text-center">Company</th>
              <th className="border border-gray-300 px-2 py-2 text-center">Email</th>
              <th className="border border-gray-300 px-2 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumniList.map((alumni, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-200">
                <td className="border border-gray-300 px-2 py-2 text-left">{alumni.name_of_the_alumni}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{alumni.branch}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{alumni.passed}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{alumni.company}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{alumni.mail_id}</td>
                <td className="flex gap-3 justify-center border border-gray-300 py-3 text-center">
                  <button
                    className="text-blue-600 px-2 sm:px-4 py-1 sm:py-2 hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleViewClick(alumni.login_id)}
                  >
                    View
                  </button>
                  <button
                    className="text-green-600 px-2 sm:px-4 py-1 sm:py-2 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleAddFriendClick(alumni.login_id)}
                  >
                    Add Friend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlumniTable;
