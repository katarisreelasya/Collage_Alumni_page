import React, { useEffect, useState } from 'react';

const Events = () => {
  const [completedEvents, setCompletedEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [formData, setFormData] = useState({
    event_title: '',
    event_desc: '',
    event_start_date: '',
    event_end_date: '',
    event_start_day: '',
    event_duration: ''
  });

  useEffect(() => {
    // Fetch completed and ongoing events from API
    const fetchEvents = async () => {
      try {
        const completedResponse = await fetch('http://localhost:3000/api/get/events/completed');
        const completedData = await completedResponse.json();
        setCompletedEvents(completedData);

        const ongoingResponse = await fetch('http://localhost:3000/api/get/events/ongoing');
        const ongoingData = await ongoingResponse.json();
        setOngoingEvents(ongoingData);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEditClick = (event) => {
    setEditEventId(event.event_id);
    // Format the date fields to display only YYYY-MM-DD
    setFormData({
      ...event,
      event_start_date: event.event_start_date.split('T')[0],
      event_end_date: event.event_end_date.split('T')[0]
    });
  };

  const handleDelete = async (event_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/delete/events/${event_id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          alert('Event deleted successfully!');
          setCompletedEvents(completedEvents.filter(event => event.event_id !== event_id));
          setOngoingEvents(ongoingEvents.filter(event => event.event_id !== event_id));
        } else {
          alert('Failed to delete event.');
        }
      } catch (error) {
        console.error('Error deleting event', error);
        alert('Failed to delete event');
      }
    }
  };

  const handleUpdate = async (event_id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/update/events/${event_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Event updated successfully!');
        const updatedEvents = completedEvents.map(event => (event.event_id === event_id ? formData : event));
        setCompletedEvents(updatedEvents);
        const ongoingUpdated = ongoingEvents.map(event => (event.event_id === event_id ? formData : event));
        setOngoingEvents(ongoingUpdated);
        setEditEventId(null);
        setFormData({
          event_title: '',
          event_desc: '',
          event_start_date: '',
          event_end_date: '',
          event_start_day: '',
          event_duration: ''
        });
      } else {
        alert('Failed to update event.');
      }
    } catch (error) {
      console.error('Error updating event', error);
      alert('Failed to update event');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-center text-blue-700 underline text-2xl font-bold mb-4">Events</h2>

      {/* Completed Events Table */}
      <h3 className="text-xl font-semibold mb-2">Completed Events</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2">Event Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Start Date</th>
            <th className="border border-gray-300 p-2">End Date</th>
            <th className="border border-gray-300 p-2">Start Day</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {completedEvents.map(event => (
            <tr key={event.event_id} className="hover:bg-gray-100 mt-5">
              <td className="border border-gray-300 p-2">{event.event_title}</td>
              <td className="border border-gray-300 p-2">{event.event_desc}</td>
              <td className="border border-gray-300 p-2">{event.event_start_date.split('T')[0]}</td>
              <td className="border border-gray-300 p-2">{event.event_end_date.split('T')[0]}</td>
              <td className="border border-gray-300 p-2">{event.event_start_day}</td>
              <td className="border border-gray-300 p-2">{event.event_duration}</td>
              <td className="flex gap-3 border border-gray-200 p-4">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEditClick(event)}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(event.event_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ongoing Events Table */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Ongoing Events</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2">Event Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Start Date</th>
            <th className="border border-gray-300 p-2">End Date</th>
            <th className="border border-gray-300 p-2">Start Day</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ongoingEvents.map(event => (
            <tr key={event.event_id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{event.event_title}</td>
              <td className="border border-gray-300 p-2">{event.event_desc}</td>
              <td className="border border-gray-300 p-2">{event.event_start_date.split('T')[0]}</td>
              <td className="border border-gray-300 p-2">{event.event_end_date.split('T')[0]}</td>
              <td className="border border-gray-300 p-2">{event.event_start_day}</td>
              <td className="border border-gray-300 p-2">{event.event_duration}</td>
              <td className="flex gap-3 border border-gray-200 p-4">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEditClick(event)}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(event.event_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form Modal */}
      {editEventId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-11/12 max-w-2xl overflow-auto max-h-screen">
            <h3 className="text-lg font-semibold mb-2">Edit Event</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editEventId);
            }}>
              <input
                type="text"
                placeholder="Event Title"
                value={formData.event_title}
                onChange={(e) => setFormData({ ...formData, event_title: e.target.value })}
                required
                className="border rounded p-1 mb-2 w-full"
              />
              <textarea
                placeholder="Description"
                value={formData.event_desc}
                onChange={(e) => setFormData({ ...formData, event_desc: e.target.value })}
                required
                className="border rounded p-1 mb-2 w-full"
              />
              <input
                type="date"
                value={formData.event_start_date}
                onChange={(e) => setFormData({ ...formData, event_start_date: e.target.value })}
                required
                className="border rounded p-1 mb-2 w-full"
              />
              <input
                type="date"
                value={formData.event_end_date}
                onChange={(e) => setFormData({ ...formData, event_end_date: e.target.value })}
                required
                className="border rounded p-1 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Start Day"
                value={formData.event_start_day}
                onChange={(e) => setFormData({ ...formData, event_start_day: e.target.value })}
                required
                className="border rounded p-1 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Duration"
                value={formData.event_duration}
                onChange={(e) => setFormData({ ...formData, event_duration: e.target.value })}
                required
                className="border rounded p-1 mb-2 w-full"
              />
              <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
              <button type="button" className="ml-2 bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setEditEventId(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
