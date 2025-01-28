import React, { useEffect, useState } from 'react';

const Webinar = () => {
  const [webinars, setWebinars] = useState([]);
  const [editData, setEditData] = useState(null);

  // Fetch all webinar data on component mount
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/webinar/get/all', {
          credentials: 'include', // Include cookies and credentials
        });
        if (response.ok) {
          const data = await response.json();
          setWebinars(data);
        } else {
          console.error('Failed to fetch webinar data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWebinars();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle setting edit data with formatted date
  const handleEditClick = (webinar) => {
    setEditData({
      ...webinar,
      date: new Date(webinar.date).toISOString().split('T')[0], // Format date to YYYY-MM-DD
    });
  };

  // Handle edit
  const handleEdit = async (web_id) => {
    if (!editData) return; // Ensure there's data to update

    try {
      editData.deadline = new Date(editData.deadline).toISOString().slice(0, 19).replace('T', ' ');

      const response = await fetch(`http://localhost:3000/api/webinar/update/${web_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies and credentials
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        alert('Webinar updated successfully');
        const updatedWebinars = webinars.map((webinar) =>
          webinar.web_id === web_id ? { ...webinar, ...editData } : webinar
        );
        setWebinars(updatedWebinars);
        setEditData(null);
      } else {
        console.error('Failed to update webinar');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (web_id) => {
    const confirmed = window.confirm('Are you sure you want to delete this webinar?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/api/webinar/delete/${web_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Webinar deleted successfully');
        setWebinars(webinars.filter((webinar) => webinar.web_id !== web_id));
      } else {
        console.error('Failed to delete webinar. Status code:', response.status);
      }
    } catch (error) {
      console.error('Error during delete operation:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Webinar List</h1>
      {webinars.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {webinars.map((webinar) => (
                <tr key={webinar.web_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-300 text-sm">{webinar.web_title}</td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm">{webinar.description}</td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm">{webinar.time}</td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm">{webinar.date}</td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-semibold mr-4"
                      onClick={() => handleEditClick(webinar)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 font-semibold"
                      onClick={() => handleDelete(webinar.web_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-sm">No webinars found.</p>
      )}

      {editData && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Webinar</h2>
          <input
            type="text"
            name="web_title"
            placeholder="Title"
            value={editData.web_title}
            onChange={handleChange}
            className="border rounded-lg p-2 mb-4 w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={editData.description}
            onChange={handleChange}
            className="border rounded-lg p-2 mb-4 w-full"
          ></textarea>
          <input
            type="time"
            name="time"
            value={editData.time}
            onChange={handleChange}
            className="border rounded-lg p-2 mb-4 w-full"
          />
          <input
            type="date"
            name="date"
            value={editData.date}
            onChange={handleChange}
            className="border rounded-lg p-2 mb-4 w-full"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => handleEdit(editData.web_id)}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Webinar;
