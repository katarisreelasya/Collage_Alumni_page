import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav';

const JobDetails = () => {
  const { jobId } = useParams(); // Get job ID from URL params
  const [job, setJob] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to format date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`,{
        withCredentials:true
      });
      console.log('API Response:', response.data); // Log response to check the structure
      const jobData = response.data.jobListings[0]; // Access the first job in jobListings array
      setJob(jobData); // Set the job details in state
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  useEffect(() => {
    fetchJobDetails(); // Fetch job details when component mounts or jobId changes
  }, [jobId]);

  if (!job) return <div>Loading...</div>; // Display loading state while fetching

  return (

    <>
    <Nav/>
    <div className="flex justify-center items-center h-auto min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-6 sm:p-8 lg:p-10 transform hover:scale-105 transition-all duration-300 ease-in-out">
        <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-4 sm:mb-6 text-center">{job.position}</h1>
        <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-4"><strong>Company:</strong> {job.Company}</p>
        <p className="mb-2 sm:mb-4 text-justify text-gray-600 text-sm sm:text-base"><strong>Description:</strong> {job.description}</p>
        <p className="mb-2 sm:mb-4 text-justify text-gray-600 text-sm sm:text-base"><strong>Requirements:</strong> {job.requirements}</p>
        <p className="mb-4 sm:mb-6 text-gray-700 text-sm sm:text-base"><strong>Application Deadline:</strong> {formatDate(job.application_deadline)}</p>

        <div className="flex justify-center gap-4">
          {/* Back button to navigate to career alerts */}
          <button
            onClick={() => navigate('/career_alerts')} // Navigate to /career_alerts
            className="lg:w-[9vw] w-[100px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 px-3 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Back
          </button>

          {/* Apply Now button to navigate to the job application link */}
          <a href={job.joblink} target="_blank" rel="noopener noreferrer">
            <button className="lg:w-[9vw] w-[100px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 px-3 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              Apply Now
            </button>
          </a>
        </div>

      </div>
    </div></>
  );
};

export default JobDetails;
