import React, { useEffect, useState } from 'react';
import Nav from '../Nav';

const EventCard = ({ date, title, venue, duration, isCompleted }) => (
  <div className="flex flex-col sm:flex-row mb-4 w-full sm:w-[450px] transform transition duration-500 hover:scale-105">
    <div className={`${isCompleted ? 'bg-gray-500' : 'bg-[#295F98]'} text-white p-4 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none flex flex-col items-center justify-center w-full sm:w-24`}>
      <span className="text-sm">{date.day}</span>
      <span className="text-2xl font-bold">{date.number}</span>
      <span className="text-sm">{date.month} {date.year}</span>
    </div>
    <div className="bg-white border border-gray-200 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none p-4 hover:bg-gray-100 flex-grow">
      <h3 className="text-lg font-semibold text-[#295F98]">{title}</h3>
      <p className="text-sm text-gray-600">Venue: {venue}</p>
      <p className="text-sm text-gray-600">{duration}</p>
    </div>
  </div>
);

const EventsList = () => {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  // Fetch ongoing events
  useEffect(() => {
    fetch('http://localhost:3000/api/get/events/ongoing')
      .then(response => response.json())
      .then(data => Array.isArray(data) ? setOngoingEvents(data) : setOngoingEvents([]))
      .catch(error => {
        console.error('Error fetching ongoing events:', error);
        setOngoingEvents([]);
      });
  }, []);

  // Fetch completed events
  useEffect(() => {
    fetch('http://localhost:3000/api/get/events/completed')
      .then(response => response.json())
      .then(data => Array.isArray(data) ? setCompletedEvents(data) : setCompletedEvents([]))
      .catch(error => {
        console.error('Error fetching completed events:', error);
        setCompletedEvents([]);
      });
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleString('en-US', { weekday: 'long' });
    const number = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return { day, number, month, year };
  };

  return (
    <div>
      <Nav />
      <div className="container mx-auto mt-5 px-4 sm:px-0">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gray-100 border-y border-gray-200 py-5">Events (At GMRIT)</h1>
        <div className="flex flex-wrap justify-start sm:justify-center gap-4">
          {ongoingEvents.map((event) => (
            <a href='#' key={event.event_id} className="w-full sm:w-auto mx-3">
              <EventCard
                date={formatDate(event.event_start_date)}
                title={event.event_title}
                venue="Main Gate Rd, IIT Area, Powai, Mumbai, ..."
                duration={event.event_duration}
              />
            </a>
          ))}
        </div>
      </div>
     
      <div className="container mx-auto mt-5 px-4 sm:px-0">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gray-100 border-y border-gray-200 py-5">Completed Events</h1>
        <div className="flex flex-wrap justify-start sm:justify-center gap-4">
          {completedEvents.map((event) => (
            <a href='#' key={event.event_id} className="w-full sm:w-auto mx-3">
              <EventCard
                date={formatDate(event.event_start_date)}
                title={event.event_title}
                venue="Main Gate Rd, IIT Area, Powai, Mumbai, ..."
                duration={event.event_duration}
                isCompleted={true}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
