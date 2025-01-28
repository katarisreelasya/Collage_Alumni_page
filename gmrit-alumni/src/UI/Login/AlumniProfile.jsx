import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlumniProfile = ({ alumni_id }) => {
  const [profile, setProfile] = useState({});
  const [employmentHistory, setEmploymentHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Fetch profile details
    axios.get(`http://localhost:3000/api/alumni/get/${alumni_id}`)
      .then(response => setProfile(response.data))
      .catch(error => console.error(error));

    // Fetch employment history
    axios.get(`http://localhost:3000/api/emp/${alumni_id}`)
      .then(response => setEmploymentHistory(response.data))
      .catch(error => console.error(error));

    // Fetch achievements
    axios.get(`http://localhost:3000/api/acheivements/${alumni_id}`)
      .then(response => setAchievements(response.data))
      .catch(error => console.error(error));
  }, [alumni_id]);

  // Function to handle adding new experience
  const addExperience = (experience) => {
    axios.post(`http://localhost:3000/api/emp/${alumni_id}`, experience)
      .then(response => setEmploymentHistory([...employmentHistory, response.data]))
      .catch(error => console.error(error));
  };

  // Function to handle adding new achievement
  const addAchievement = (achievement) => {
    axios.post(`http://localhost:3000/api/acheivements/${alumni_id}`, achievement)
      .then(response => setAchievements([...achievements, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <div className="profile-page p-4">
      <div className="profile-header bg-gray-100 p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-semibold">{profile.name}</h1>
        <p className="text-lg text-gray-700">{profile.email}</p>
        <p className="text-lg text-gray-700">{profile.phone}</p>
        <p className="text-lg text-gray-700">{profile.location}</p>
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Edit Profile
        </button>
      </div>

      <div className="employment-history bg-white p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Employment History</h2>
        {employmentHistory.map((job, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg font-medium">{job.company} - {job.title}</p>
            <p className="text-gray-600">{job.start_date} to {job.end_date || 'Present'}</p>
          </div>
        ))}
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          + Add Experience
        </button>
      </div>

      <div className="achievements bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
        {achievements.map((ach, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg font-medium">{ach.title}</p>
            <p className="text-gray-600">{ach.description}</p>
          </div>
        ))}
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          + Add Achievement
        </button>
      </div>
    </div>
  );
};

export default AlumniProfile;
