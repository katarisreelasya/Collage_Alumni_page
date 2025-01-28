import React, { useEffect, useState } from 'react';
import BarGraph from './chats/BarGraph';
import Doughnut from './chats/DoughnutC';
import LineG from './chats/LineG';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobsThisWeek, setJobsThisWeek] = useState(0);
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [alumniRequestsCount, setAlumniRequestsCount] = useState(0);
  const [ongoingEventsCount, setOngoingEventsCount] = useState(0);
  const [completedEventsCount, setCompletedEventsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job notifications count
        const { data: jobData } = await axios.get('http://localhost:3000/api/jobNotificationsCount');
        setTotalJobs(jobData.jobNotificationsCount);

        // Fetch job notifications count
        const { data: recentJobData } = await axios.get('http://localhost:3000/api/recentNotificationsCount');
        setJobsThisWeek(recentJobData.recentNotificationsCount);

        // Fetch alumni count
        const { data: alumniData } = await axios.get('http://localhost:3000/api/alumni/count');
        setTotalAlumni(alumniData.totalAlumniCount);

        // Fetch alumni requests count
        const { data: requestsData } = await axios.get('http://localhost:3000/api/alumni/requests/count', {
          withCredentials: true,
        });
        setAlumniRequestsCount(requestsData.alumniRequestsCount);

        // Fetch ongoing events count
        const { data: ongoingData } = await axios.get('http://localhost:3000/api/get/events/ongoing/count', {
          withCredentials: true,
        });
        setOngoingEventsCount(ongoingData[0].count);

        // Fetch completed events count
        const { data: completedData } = await axios.get('http://localhost:3000/api/get/events/completed/count', {
          withCredentials: true,
        });
        setCompletedEventsCount(completedData[0].count);


      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-8 h-[1000px] lg:h-screen w-[85vw] lg:w-full bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 animate-fadeIn">Welcome to the Admin Dashboard</h1>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[  
          { label: 'Total Alumni', value: totalAlumni ,link: 'Alumni_Data'},
          { label: 'Job Notifications', value: totalJobs, subtext: 'Active Jobs',link: 'Job_Notifications' },
          { label: 'Job Notifications Added', value: jobsThisWeek, subtext: 'This week',link: 'Job_Notifications' },
          { label: 'Alumni Registration Requests', value: alumniRequestsCount, subtext: 'Pending requests',link: 'alumni_requests' },
          { label: 'Ongoing Events', value: ongoingEventsCount, subtext: 'Current Events',link: 'events' },
          { label: 'Completed Events', value: completedEventsCount, subtext: 'Finished Events',link: 'events' },
        ].map((card, index) => (
          <Link to={card.link}>
          <div key={index} className="h-[200px] bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-700">{card.label}</h3>
            {loading ? (
              <p className="text-4xl font-bold text-gray-900 mt-2">Loading...</p>
            ) : (
              <p className="text-4xl font-bold text-gray-900 mt-2 animate-fadeIn">{card.value}</p>
            )}
            {card.subtext && <p className="text-sm text-gray-500">{card.subtext}</p>}
          </div>
          </Link>
        ))}
      </section>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
        <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <Doughnut />
        </div>
        {/* <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <LineG />
        </div> */}
        <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <BarGraph />
        </div>
        
      </div>

      {/* Recent Activities Section */}
      {/* <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Recent Activities</h2>
        <ul className="bg-white shadow-md rounded-lg p-6">
          {[  
            { text: 'Added 1 new alumni', time: '2 hours ago' },
            { text: 'Published 1 new job notifications', time: 'Yesterday' },
            { text: 'Reviewed alumni profiles', time: '2 days ago' },
          ].map((activity, index) => (
            <li key={index} className="mb-4">
              <p className="text-lg text-gray-700 font-medium">{activity.text}</p>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </li>
          ))} 
        </ul>
      </section> */}
    </div>
  );
};

export default AdminHome;
