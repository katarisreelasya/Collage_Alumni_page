import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import Image5 from '../../assets/image5.jpg';
import Nav from '../Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../store/userStore';

const API_URL = 'http://localhost:3000/api/jobs';


// Component to display individual job listings
const BulletPoints = ({ job }) => {


    return (
        <div className='flex gap-4 text-lg'>
            <svg
                className="w-6 h-6 ml-0 sm:ml-20 mt-1 text-red-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                />
            </svg>
            <div>
                <p className='font-semibold'>{job.position}</p>
                <Link to={`/career_alerts/${job.job_id}`}>
                    <button className='mt-2 bg-blue-500 text-white py-1 px-3 rounded'>
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

// Form to add a new job notification
const AddJobNotification = ({ fetchJobs }) => {
    const [jobDetails, setJobDetails] = useState({
        Company: '',
        position: '',
        description: '',
        requirements: '',
        application_deadline: '',
        job_link: '',
    });

    const [error, setError] = useState('');

    const getTodayDate = () => {
        const today = new Date();
        const date = today.toISOString().split('T')[0];
        const time = today.toISOString().slice(0, 16);
        return { date, time };
    };

    const today = getTodayDate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobDetails({ ...jobDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!jobDetails.Company || !jobDetails.position || !jobDetails.description || !jobDetails.requirements || !jobDetails.application_deadline || !jobDetails.job_link) {
            setError('Please fill out all fields');
            alert('Please fill out all fields');
            return;
        }

        setError('');

        try {
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
                setJobDetails({
                    Company: '',
                    position: '',
                    description: '',
                    requirements: '',
                    application_deadline: '',
                    job_link: '',
                });
                fetchJobs(); // Fetch the updated list of jobs after adding a new one
            } else {
                alert('Failed to post the job');
            }
        } catch (err) {
            console.error('Error adding job:', err);
            alert('Error adding job');
        }
    };

    return (
        <form className="w-full max-w-lg p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center">Add Job Notification</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Company:</label>
                <input
                    type="text"
                    name="Company"
                    value={jobDetails.Company}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

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
    );
};

// Main CareerAlerts component
const CareerAlerts = () => {
    const [jobs, setJobs] = useState([]);
    const {user} = useUser();

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`${API_URL}/get/all`, { withCredentials: true });
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Error fetching job listings:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
         user ?
        (
        <div>
            <Nav />
            <TopBar img={Image5} name="Career Alerts" />
            <div className="my-4 mx-3 flex flex-col sm:flex-row">
                {/* Left side: job notifications */}
                <div className="sm:w-full lg:w-full sm:mr-4">
                    <h1 className="font-bold text-2xl text-[#00327a] text-center sm:text-left ml-10">JOB NOTIFICATIONS</h1>
                    <ul>
                        {Array.isArray(jobs) && jobs.length > 0 ? (
                            jobs.map((item) => (
                                <li key={item.job_id} className="mt-5">
                                    <BulletPoints job={item} />
                                </li>
                            ))
                        ) : (
                            <li>No job listings available.</li>
                        )}
                    </ul>
                </div>

                {/* Right side: add job notification form */}
                <div className="sm:w-full lg:w-full">
                    <AddJobNotification fetchJobs={fetchJobs} />
                </div>
            </div>
        </div>
        ):<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Restricted</h2>
          <p className="text-gray-700 mb-6">
            You need to be logged in to access this resource. Please login to continue.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Link to={'/login'}>Login</Link>
          </button>
        </div>
      </div>
    
    );
};

export default CareerAlerts;
