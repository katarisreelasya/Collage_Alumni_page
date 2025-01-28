import React, { useState } from 'react';

const API_URL = 'http://localhost:3000/api/jobs';

const AddJobNotification = () => {
  const [jobDetails, setJobDetails] = useState({
    Company: '', // Keep this as 'Company' to match the input name
    position: '',
    description: '',
    requirements: '',
    application_deadline: '',
    
    job_link: '',
  });

  const [error, setError] = useState('');

  // Get today's date in the format for 'date' and 'datetime-local' inputs
  const getTodayDate = () => {
    const today = new Date();
    const date = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const time = today.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
    return { date, time };
  };

  const today = getTodayDate();

  // Handling input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !jobDetails.Company || // Check for 'Company'
      !jobDetails.position ||
      !jobDetails.description ||
      !jobDetails.requirements ||
      !jobDetails.application_deadline ||
      !jobDetails.job_link
    ) {
      setError('Please fill out all fields');
      alert('Please fill out all fields');
      return;
    }

    // Reset error
    setError('');

    try {
      // Sending POST request to the backend
      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Job posted successfully!');
        // Reset job details to empty strings after successful post
        setJobDetails({
          Company: '', // Resetting to empty for 'Company'
          position: '',
          description: '',
          requirements: '',
          application_deadline: '',
          job_link: '',
        });
      } else {
        alert('Failed to post the job');
      }
    } catch (err) {
      console.error('Error adding job:', err);
      alert('Error adding job');
    }
  };

  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Add Job Notification</h2>

        {/* Company */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Company:</label>
          <input
            type="text"
            name="Company" // Keep this as 'Company'
            value={jobDetails.Company} // Match with state
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Position */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Position:</label>
          <input
            type="text"
            name="position"
            value={jobDetails.position}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Job Description:</label>
          <textarea
            name="description"
            value={jobDetails.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Requirements:</label>
          <textarea
            name="requirements"
            value={jobDetails.requirements}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        {/* Application Deadline */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Application Deadline:</label>
          <input
            type="date"
            name="application_deadline"
            value={jobDetails.application_deadline}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            min={today.date}
          />
        </div>

        {/* Posting Date */}
        {/* <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Posting Date:</label>
          <input
            type="datetime-local"
            name="posting_date"
            value={jobDetails.posting_date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            min={today.time}
          />
        </div> */}

        {/* Job Link */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Job Link:</label>
          <input
            type="text"
            name="job_link"
            value={jobDetails.job_link}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default AddJobNotification;
