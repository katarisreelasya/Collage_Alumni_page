import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import stu_image from '../../assets/digi-pic.jpeg';
import Nav from '../Nav';

const API_URL = 'http://localhost:3000/api/alumni/get/';
const EMPLOYMENT_URL = 'http://localhost:3000/api/alumni/employee/history/';
const ACHIEVEMENTS_URL = 'http://localhost:3000/api/achievements/';

const AlumniDetails = () => {
  const { login_id } = useParams(); // Extract login_id from the route
  const [alumniDetails, setAlumniDetails] = useState(null);
  const [employmentHistory, setEmploymentHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchAlumniDetails = async () => {
      try {
        const response = await fetch(`${API_URL}${login_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch alumni details');
        }

        const data = await response.json();
        setAlumniDetails(data.alumni[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchEmploymentHistory = async () => {
      try {
        const response = await fetch(`${EMPLOYMENT_URL}${login_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employment history');
        }

        const data = await response.json();
        setEmploymentHistory(data.data || []); // Adjust to match response structure
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAchievements = async () => {
      try {
        const response = await fetch(`${ACHIEVEMENTS_URL}${login_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }

        const data = await response.json();
        setAchievements(data.result || []); // Adjust to match response structure
      } catch (err) {
        setError(err.message);
      }
    };


    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchAlumniDetails(), fetchEmploymentHistory(), fetchAchievements()]);
      setLoading(false);
    };

    fetchData();
    
  }, [login_id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className='bg-blue-50'>
      <Nav />
      
      <div className="flex items-center justify-center py-5">
        <div className="max-w-2xl w-full p-8 bg-white shadow-lg rounded-lg">
          {alumniDetails ? (
            <div>
              <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Alumni Details</h1>
              <div className='flex justify-center py-5 '>
              <img src={stu_image} alt="student image" className='rounded-full border border-2'/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-10">
                <p className="font-normal text-gray-700"><span className="font-bold">Name:</span> <span className="font-base">{alumniDetails.name_of_the_alumni}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Login ID:</span> <span className="font-base">{alumniDetails.login_id}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Gender:</span> <span className="font-base">{alumniDetails.gender}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Course:</span> <span className="font-base">{alumniDetails.course}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Branch:</span> <span className="font-base">{alumniDetails.branch}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">DOB:</span> <span className="font-base">{alumniDetails.dob}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Graduation Year:</span> <span className="font-base">{alumniDetails.passed}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Company:</span> <span className="font-base">{alumniDetails.company}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Designation:</span> <span className="font-base">{alumniDetails.designation}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Address:</span> <span className="font-base">{alumniDetails.address}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">State:</span> <span className="font-base">{alumniDetails.state}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Country:</span> <span className="font-base">{alumniDetails.country}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Phone:</span> <span className="font-base">{alumniDetails.phone_no}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Email:</span> <span className="font-base">{alumniDetails.mail_id}</span></p>
                <p className="font-normal text-gray-700"><span className="font-bold">Location:</span> <span className="font-base">{alumniDetails.current_location}</span></p>



              </div>

              {/* Employment History */}
              <h2 className="text-2xl font-bold text-center text-blue-700 mt-8 mb-4">Employment History</h2>
              {employmentHistory.length > 0 ? (
                <div className="">
                  {employmentHistory.map((job, index) => (
                    <div key={index} className="mb-4 bg-blue-100 p-4 rounded-lg mb-6">
                      <p className="font-normal text-gray-700"><span className="font-bold">Organization:</span> {job.organization}</p>
                      <p className="font-normal text-gray-700"><span className="font-bold">Designation:</span> {job.designation}</p>
                      <p className="font-normal text-gray-700"><span className="font-bold">Department:</span> {job.department}</p>
                      <p className="font-normal text-gray-700"><span className="font-bold">Experience (years):</span> {job.experience_years}</p>
                      <p className="font-normal text-gray-700"><span className="font-bold">Work Phone:</span> {job.work_phone}</p>
                      <p className="font-normal text-gray-700"><span className="font-bold">Work Email:</span> {job.work_email}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No employment history available.</p>
              )}

              {/* Achievements */}
              <h2 className="text-2xl font-bold text-center text-blue-700 mt-8 mb-4">Achievements</h2>
              {achievements.length > 0 ? (
                <div className="">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="mb-4 bg-blue-100 p-4 rounded-lg mb-6">
                      <p className="font-normal text-gray-700"><span className="font-bold">Title:</span> {achievement.title}</p>
                      <p className="font-normal text-gray-700"><span className="font-bold">Description:</span> {achievement.description}</p>
                      <p className="font-normal text-gray-700"><span className="font-bold">Achievement Date:</span> {achievement.achievement_date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No achievements available.</p>
              )}

              {/* Back Button */}
              <div onClick={() => navigate('/stu_directory')} className="mt-4 flex ml-10 cursor-pointer">
                <div className="hover:transition-all duration-300 ease-in-out transform hover:scale-105">
                  <svg className="w-6 h-6 text-blue-600 dark:text-white mt-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="m15 19-7-7 7-7" />
                  </svg>
                </div>
                <div className="text-blue-600 font-semibold text-base pt-2.5">Back</div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniDetails;
