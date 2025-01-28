// src/components/RequestApproveOrReject.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RequestApproveOrReject = () => {
  const { requestId } = useParams(); 
  console.log(requestId,"this is request id");
  
  const [formData, setFormData] = useState({
    login_id: '',
    name_of_the_alumni: '',
    gender: '',
    course: '',
    branch: '',
    dob: '',
    passed: '',
    address: '',
    state: '',
    country: '',
    zipcode: '',
    phone_no: '',
    mail_id: '',
    dor: '',
    parent_number: '',
    organization:'',
    designation:'',
    department:'',
    work_phone:'',
    work_email:'',
    experience_years:'',
    title:'',
    description:'',
    achievement_date:'',
    password:''
  });

  useEffect(() => {
    if (requestId) {
      // Fetch the alumni request by ID for editing
      const fetchAlumni = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/alumni/request/${requestId}`, {
            credentials: 'include',
          });
          const data = await response.json();
          if (response.ok) {
            setFormData({
              ...data.user,login_id:data.user.jntu_id
            });  // Pre-fill form with existing data
          } else {
            setMessage(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error('Error fetching alumni data:', error);
          setMessage('Failed to load alumni data.');
        }
      };
      fetchAlumni();
    }
  }, [requestId]);

  const [message, setMessage] = useState('');
  const [error, setError] = useState(null); // For catching any errors from fetch

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
  
    // Ensure that mandatory fields are filled
    const { login_id, name_of_the_alumni, course, branch, passed } = formData;
    if (!login_id || !name_of_the_alumni || !course || !branch || !passed) {
      setMessage('Please fill in all mandatory fields (Login ID, Name, Course, Branch, and Passed Year).');
      return;
    }
  
    // Create a new object that matches the expected field names in the backend
    const payload = {
      login_id: formData.login_id,
      name_of_the_alumni: formData.name_of_the_alumni,
      gender: formData.gender,
      course: formData.course,
      branch: formData.branch,
      dob: formData.dob,
      passed: formData.passed,
      address: formData.address,
      state: formData.state,
      country: formData.country,
      zipcode: formData.zipcode,
      phone_no: formData.phone_no,
      mail_id: formData.mail_id,
      dor: formData.dor,
      parent_number: formData.parent_number,
      company: formData.company,
      organization: formData.organization,
      designation: formData.designation,
      department: formData.department,
      work_phone: formData.work_phone,
      work_email: formData.work_email,
      experience_years: formData.experience_years,
      title: formData.title,
      description: formData.description,
      achievement_date: formData.achievement_date,
      password: formData.password,
      request_id: requestId,
      action: action, // Pass "approve" or "reject" based on the user click
    };
  
    try {
      const url = 'http://localhost:3000/api/admin/alumni/add';
      const method = 'POST';
  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
  
      const data = await response.json();
      console.log("Response Data:", data);
  
      if (response.status === 200) {
        // If the action was successful (either approval or update)
        window.alert(action === "approve" ? 'Alumni data approved successfully.' : 'Alumni data added successfully.');
        setFormData({
          login_id: '',
          name_of_the_alumni: '',
          gender: '',
          course: '',
          branch: '',
          dob: '',
          passed: '',
          address: '',
          state: '',
          country: '',
          zipcode: '',
          phone_no: '',
          mail_id: '',
          dor: '',
          parent_number: '',
          company: '',
          dept: '',
          organization: '',
          designation: '',
          department: '',
          work_phone: '',
          work_email: '',
          experience_years: '',
          title: '',
          description: '',
          achievement_date: '',
          password:''
        });
        setMessage('');
      } else if (response.status === 302) {
        // If rejection
        window.alert("Request Rejected Successfully");
        setMessage('Rejection was successful.');
      } else {
        setMessage(`Error: ${data.message} : ${data.error ? data.error.message : ''}`);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.message.includes("ER_DUP_ENTRY")) {
        setMessage('Duplicate entry: An alumni with the same Login ID already exists.');
      } else {
        setMessage('Failed to add alumni data.');
      }
    }
  };
  


  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Add Alumni Data</h2>

        {/* Login ID (Mandatory) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Login ID <span className="text-red-500">*</span>:</label>
          <input
            type="text"
            name="login_id"
            value={formData.login_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Name (Mandatory) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name <span className="text-red-500">*</span>:</label>
          <input
            type="text"
            name="name_of_the_alumni"
            value={formData.name_of_the_alumni}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Course (Mandatory) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Course <span className="text-red-500">*</span>:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Branch (Mandatory) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Branch <span className="text-red-500">*</span>:</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Year Passed (Mandatory) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Year Passed <span className="text-red-500">*</span>:</label>
          <input
            type="number"
            name="passed"
            value={formData.passed}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Date of Birth:</label>
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Zipcode */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Zipcode:</label>
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            name="mail_id"
            value={formData.mail_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Date of Registration */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">DOR:</label>
          <input
            type="text"
            name="dor"
            value={formData.dor}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Parent Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Parent Number:</label>
          <input
            type="text"
            name="parent_number"
            value={formData.parent_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">LinkedIn:</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Twitter Id:</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Company */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Company:</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Department:</label>
          <input
            type="text"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Work Phone:</label>
          <input
            type="text"
            name="work_phone"
            value={formData.work_phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Work Email:</label>
          <input
            type="text"
            name="work_mail"
            value={formData.work_mail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Experience Years:</label>
          <input
            type="text"
            name="experience_years"
            value={formData.experience_years}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Achievement Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Achievement Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Achievement Date:</label>
          <input
            type="text"
            name="achievement_date"
            value={formData.achievement_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password :</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
      <div className='flex justify-between'>
      <div className="text-center">
          <button
            type="submit"
            onClick={(e)=>{
              handleSubmit(e,"approve")
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Approve Request
          </button>
        </div>
        <div className="text-center">
          <button
            type="submit"
            onClick={(e)=>{
              handleSubmit(e,"reject")
            }}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          >
            
            Reject Request</button>
        </div>

      </div>
        {/* Error Message */}
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default RequestApproveOrReject;
