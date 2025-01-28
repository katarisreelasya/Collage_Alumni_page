import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    name_of_the_alumni: '',
    gender: '',
    dob: '',
    course: '',
    branch: '',
    passed: '',
    address: '',
    state: '',
    country: '',
    zipcode: '',
    phone_no: '',
    mail_id: '',
    parent_number: '',
    company: '',
    designation: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Populate the formData with the user information when the component mounts
    setFormData({
      name_of_the_alumni: user.name_of_the_alumni || '',
      gender: user.gender || '',
      dob: user.dob || '',
      course: user.course || '',
      branch: user.branch || '',
      passed: user.passed || '',
      address: user.address || '',
      state: user.state || '',
      country: user.country || '',
      zipcode: user.zipcode || '',
      phone_no: user.phone_no || '',
      mail_id: user.mail_id || '',
      parent_number: user.parent_number || '',
      company: user.company || '',
      designation: user.designation || '',
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    navigate("/user/profile");
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/alumni/update/${user.login_id}`, formData, {
        withCredentials: true, // Include credentials (cookies) with the request
      });
      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate("/user/profile"); // Optionally navigate back to profile view
      }
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Failed to update profile: ' + (error.response?.data?.message || 'An error occurred.'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name:</label>
          <input
            type="text"
            name="name_of_the_alumni"
            value={formData.name_of_the_alumni}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number:</label>
          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email:</label>
          <input
            type="email"
            name="mail_id"
            value={formData.mail_id}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Parent's Phone Number:</label>
          <input
            type="text"
            name="parent_number"
            value={formData.parent_number}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Zipcode:</label>
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Branch:</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Passed:</label>
          <input
            type="text"
            name="passed"
            value={formData.passed}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-white rounded w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white w-[150px] px-4 py-2 rounded-md mr-4 hover:bg-green-700"
        >
          Save Changes
        </button>
        <button
          onClick={handleBack}
          className="bg-blue-600 text-white w-[150px] px-10 py-2 rounded-md mr-4 hover:bg-blue-700"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
