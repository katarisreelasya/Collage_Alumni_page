import React, { useEffect, useState } from 'react';

const ClgPost = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    post_title: '',
    post_description: '',
    post_images: [],
    post_date: '',
    post_time: '',
  });

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/events', {
        credentials: 'include',
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch a single event by ID and populate formData
  const fetchEventById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setSelectedEvent(data);

      // Convert the date to the format 'YYYY-MM-DD'
      const formattedDate = new Date(data.post_date).toISOString().split('T')[0];

      setFormData({
        post_title: data.post_title,
        post_description: data.post_description,
        post_images: data.post_images || [],
        post_date: formattedDate, // Properly formatted date
        post_time: data.post_time, // Existing time
      });
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  // Update an event
  const updateEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      if (response.ok) {
        alert('Event updated successfully!');
        fetchEvents();
        setSelectedEvent(null); // Close the edit form
      } else {
        alert('Failed to update event.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Delete an event
  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        alert('Event deleted successfully!');
        fetchEvents();
      } else {
        alert('Failed to delete event.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">College Events</h1>

      {/* Display All Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.post_id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{event.post_title}</h2>

            {/* Display Images in a Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {event.post_images &&
                event.post_images.map((base64, index) => (
                  <img
                    key={index}
                    src={base64}
                    alt={`Event Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
            </div>

            <p className="text-gray-700 mb-2">{event.post_description}</p>
            <p className="text-gray-500 text-sm">
              {new Date(event.post_date).toLocaleDateString()} @ {event.post_time}
            </p>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => fetchEventById(event.post_id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteEvent(event.post_id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Event</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateEvent(selectedEvent.post_id);
              }}
              className="space-y-4"
            >
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Event Title:</label>
                <input
                  type="text"
                  name="post_title"
                  value={formData.post_title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Event Description:</label>
                <textarea
                  name="post_description"
                  value={formData.post_description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Event Date:</label>
                <input
                  type="date"
                  name="post_date"
                  value={formData.post_date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Event Time:</label>
                <input
                  type="time"
                  name="post_time"
                  value={formData.post_time}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClgPost;
