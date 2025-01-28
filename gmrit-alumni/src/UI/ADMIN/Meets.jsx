import React, { useEffect, useState } from 'react';

const Meets = () => {
  const [meets, setMeets] = useState([]);
  const [editMeet, setEditMeet] = useState(null);
  const [formData, setFormData] = useState({
    meet_link: '',
    title: '',
    description: '',
    date: '',
    time: '',
    deadline: '',
  });

  // Fetch all meet data on component load
  useEffect(() => {
    fetchMeets();
  }, []);

  const fetchMeets = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/meet/get/all');
      const data = await response.json();
      setMeets(data);
    } catch (error) {
      console.error('Error fetching meets:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/meet/update/${editMeet.meet_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Meet updated successfully');
        // Update the state with the edited meet data
        setMeets((prevMeets) =>
          prevMeets.map((meet) => (meet.meet_id === editMeet.meet_id ? { ...meet, ...formData } : meet))
        );
        setEditMeet(null); // Close the edit form
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating meet:', error);
      alert('Failed to update meet. Please try again.');
    }
  };

  // Delete a meet by ID
  const handleDelete = async (meet_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this meet?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/meet/delete/${meet_id}`, {
        method: 'DELETE',
        credentials:"include",
      });

      if (response.ok) {
        alert('Meet deleted successfully');
        setMeets((prevMeets) => prevMeets.filter((meet) => meet.meet_id !== meet_id));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting meet:', error);
      alert('Failed to delete meet. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Meets</h2>

      {/* Edit Form */}
      {editMeet && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Edit Meet</h3>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">Meet Link:</label>
            <input
              type="url"
              name="meet_link"
              value={formData.meet_link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />

            <label className="block mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />

            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />

            <label className="block mb-2">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />

            <label className="block mb-2">Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />

            <label className="block mb-2">Deadline:</label>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />

            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMeet(null)}
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-2 border-b w-1/6">Meet Link</th>
            <th className="py-2 px-4 border-b w-1/6">Title</th>
            <th className="py-2 px-4 border-b w-2/6">Description</th>
            <th className="py-2 px-4 border-b w-1/6">Date</th>
            <th className="py-2 px-4 border-b w-1/6">Time</th>
            <th className="py-2 px-4 border-b w-1/6">Created At</th>
            <th className="py-2 px-4 border-b w-1/6">Deadline</th>
            <th className="py-2 px-4 border-b w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meets.length > 0 ? (
            meets.map((meet) => (
              <tr key={meet.meet_id} className="text-center">
                <td className="py-2 px-2 border-b">
                  <a href={meet.meet_link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                </td>
                <td className="py-2 px-4 border-b">{meet.title}</td>
                <td className="py-2 px-4 border-b">{meet.description}</td>
                <td className="py-2 px-4 border-b">{new Date(meet.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{meet.time}</td>
                <td className="py-2 px-4 border-b">{new Date(meet.created_at).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{new Date(meet.deadline).toLocaleString()}</td>
                <td className="py-2 px-4 border-b flex justify-center space-x-2">
                  <button
                    onClick={() => handleDelete(meet.meet_id)}
                    className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditMeet(meet);
                      setFormData({
                        meet_link: meet.meet_link,
                        title: meet.title,
                        description: meet.description,
                        date: formatDate(meet.date),
                        time: meet.time,
                        deadline: formatDateTime(meet.deadline),
                      });
                    }}
                    className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-4 text-gray-500">
                No meets available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Meets;
