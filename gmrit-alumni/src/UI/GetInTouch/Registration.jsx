import React, { useState } from 'react';
import { RiEyeCloseFill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";

const Registration = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    program: '',
    branch: '',
    dob: '',
    yearOfPassing: '',
    country: '',
    state: '',
    place: '',
    pin: '',
    phone: '',
    email: '',
    parentMobile: '',
    linkedin: '',
    twitter: '',
    companyName: '',
    dept:'',
    dor: '',
    jntuId: '',
    organization: '',
    designation: '',
    department: '',
    work_phone: '',
    work_email: '',
    experience_years: '',
    current_location: '',
    title: '',
    description: '',
    achievement_date: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'jntuId') {
      if (!/^(1[1-9]|2[0-9])34[15]A(01|02|03|05|08|12|45|42|34)[1-9][1-9a-zA-Z]$/.test(e.target.value)) {
        setError('Invalid JNTU ID. Ensure it follows the specified format: e.g., 113415A01A.');
      } else {
        setError('');
      }
    }
  };

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordToggle1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };

  const validatePassword = (password) => {
    return /[A-Z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[!@#$%^&*(),.?":{}|<>]/.test(password) && 
           password.length >= 7 && password.length <= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.gender || !formData.program || !formData.branch || !formData.yearOfPassing || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!validatePassword(formData.password)) {
      alert('Password must be 7-10 characters long, contain an uppercase letter, a number, and a special character.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/alumni/request/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name_of_the_alumni: formData.fullName,
          gender: formData.gender,
          dob: formData.dob,
          course: formData.program,
          branch: formData.branch,
          passed: formData.yearOfPassing,
          address: `${formData.place}, ${formData.state}, ${formData.country}`,
          state: formData.state,
          country: formData.country,
          zipcode: formData.pin,
          phone_no: formData.phone,
          mail_id: formData.email,
          parent_number: formData.parentMobile,
          company: formData.companyName || null,
          dept: formData.dept || null,
          dor: formData.dor || null,
          jntu_id: formData.jntuId || null,
          organization: formData.organization,
          designation: formData.designation,
          department: formData.department,
          work_phone: formData.work_phone,
          work_email: formData.work_email,
          experience_years: formData.experience_years,
          current_location: formData.current_location,
          title: formData.title,
          description: formData.description,
          achievement_date: formData.achievement_date,
          password: formData.password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to submit form'}`);
      } else {
        alert('Request Sent successfully.');
      }
    } catch (error) {
      alert(`Error: ${error.message || 'Failed to submit form'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 py-12">
      <form onSubmit={handleSubmit} className="bg-gray-100 bg-opacity-90 p-8 md:p-12 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#00327a]">Alumni Registration Form</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange} 
              className="w-full p-[8px] border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program(B.Tech/M.Tech) *</label>
            <input 
              type="text" 
              name="program" 
              value={formData.program} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              required 
            />
          </div>

          <form onSubmit={handleSubmit} className="">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">JNTU NO *</label>
        <input
          type="text"
          name="jntuId"
          value={formData.jntuId}
          onChange={handleChange}
          className={`w-full p-[8px]  border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
    </form>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
            <select 
              name="branch" 
              value={formData.branch} 
              onChange={handleChange} 
              className="w-full p-[8px]  border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              required 
            >
             <option value="">Select Branch</option> 
             <option value="cse">CSE</option>
             <option value="aiml">CSE-AIML</option>
             <option value="aids">CSE-AIDS</option>
             <option value="ece">ECE</option>
             <option value="eee">EEE</option>
             <option value="mech">MECH</option>
             <option value="civil">CIVIL</option>
             <option value="others">Others</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DOB *</label>
            <input 
              type="date" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year of Passing *</label>
            <input 
              type="text" 
              name="yearOfPassing" 
              value={formData.yearOfPassing} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input 
              type="text" 
              name="country" 
              value={formData.country} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input 
              type="text" 
              name="state" 
              value={formData.state} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Place</label>
            <input 
              type="text" 
              name="place" 
              value={formData.place} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIN</label>
            <input 
              type="text" 
              name="pin" 
              value={formData.pin} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DOR</label>
            <input 
              type="text" 
              name="dor" 
              value={formData.dor} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone/Mobile </label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail *</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parent Mobile </label>
            <input 
              type="text" 
              name="parentMobile" 
              value={formData.parentMobile} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIN URL </label>
            <input 
              type="text" 
              name="linkedin" 
              value={formData.linkedin} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Handle </label>
            <input 
              type="text" 
              name="twitter" 
              value={formData.twitter} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
               
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-6 text-gray-800 text-center">Current Employment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input 
              type="text" 
              name="organization" 
              value={formData.organization} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
            <input 
              type="text" 
              name="designation" 
              value={formData.designation} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input 
              type="text" 
              name="department" 
              value={formData.department} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Phone</label>
            <input 
              type="text" 
              name="work_phone" 
              value={formData.work_phone} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Email</label>
            <input 
              type="text" 
              name="work_email" 
              value={formData.work_email} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Years</label>
            <input 
              type="text" 
              name="experience_years" 
              value={formData.experience_years} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
            <input 
              type="text" 
              name="current_location" 
              value={formData.current_location} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
        </div>


        <h3 className="text-xl font-bold mt-8 mb-6 text-gray-800 text-center">Achievements Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              
            />
          </div> 
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Description</label>
            <input 
              type="text" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Date</label>
            <input 
              type="text" 
              name="achievement_date" 
              value={formData.achievement_date} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              
            />
            </div>
          </div> 
           <h3 className="text-xl font-bold mt-8 mb-6 text-gray-800 text-center">Set your Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <div onClick={handlePasswordToggle} className="absolute right-3 top-10 cursor-pointer">
          {isPasswordVisible ? <FaRegEye /> : <RiEyeCloseFill />}
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
        <input
          type={isPasswordVisible1 ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-[30px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <div onClick={handlePasswordToggle1} className="absolute right-3 top-10 cursor-pointer">
          {isPasswordVisible1 ? <FaRegEye /> : <RiEyeCloseFill />}
        </div>
      </div>
          </div> 
          
          
       
        <div className="flex justify-center mt-8">
          <button 
            type="submit" 
            className="px-10 text-center bg-[#295F98] text-white py-2 rounded-[30px] font-semibold text-lg hover:bg-[#387bc2] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default Registration;
