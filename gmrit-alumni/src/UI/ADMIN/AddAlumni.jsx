import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const AddAlumni = () => {
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
    phone: '',
    mail_id: '',
    dor: '',
    parent_number: '',
    company: '',
    designation: '',
    dept: ''
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
            setFormData(data.alumni);  // Pre-fill form with existing data
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
    if (e.target.name === 'login_id') {
      if (!/^(1[1-9]|2[0-9])34[15]A(01|02|03|05|08|12|45|42|34)[1-9][1-9a-zA-Z]$/.test(e.target.value)) {
        setError('Invalid JNTU ID. Ensure it follows the specified format: e.g., 113415A01A.');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
      const data = await response.json();

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
      phone: formData.phone,
      mail_id: formData.mail_id,
      dor: formData.dor,
      parent_number: formData.parent_number,
      company: formData.company,
      designation: formData.designation,
      dept: formData.dept
    };

    try {
      const url = requestId 
      ? `http://localhost:3000/api/alumni/update/${requestId}` 
      : 'http://localhost:3000/api/alumni/add/new';
    const method = requestId ? 'PUT' : 'POST';

    
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();
      console.log("Response Data:", data);  // Log the server response

      if (response.ok) {
        window.alert(requestId ? 'Alumni data updated successfully.' : 'New alumni data added successfully.');
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
          phone: '',
          mail_id: '',
          dor: '',
          parent_number: '',
          company: '',
          designation: '',
          dept: '',
        });
        setMessage('');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to add alumni data.');
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
            // className="w-full  border rounded"
            className={`w-full p-2  border rounded "${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
            type="date"
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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            
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
            type="date"
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

        {/* Company */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
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

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Add Alumni
          </button>
        </div>

        {/* Error Message */}
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default AddAlumni;
