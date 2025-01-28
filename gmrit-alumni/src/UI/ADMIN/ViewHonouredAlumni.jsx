import React, { useEffect, useState } from 'react';

const ViewHonouredAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [editAlumniId, setEditAlumniId] = useState(null);
  const [formData, setFormData] = useState({
    h_alumni_name: '',
    h_alumni_position: '',
    h_alumni_desc: '',
    h_alumni_img: null // Store image as a file object
  });

  // Fetch honoured alumni data
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/honoured/alumni/all', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          
          setAlumni(data.length ? data : []); // If empty, set empty array
          console.log(alumni);
        } else {
          console.error('Failed to fetch honoured alumni data');
        }
      } catch (error) {
        console.error('Error fetching honoured alumni data:', error);
      }
    };
    fetchAlumni();
  }, []);

  const handleEditClick = (alumni) => {
    setEditAlumniId(alumni.h_alumni_id);
    setFormData({
      h_alumni_name: alumni.h_alumni_name,
      h_alumni_position: alumni.h_alumni_position,
      h_alumni_desc: alumni.h_alumni_desc,
      h_alumni_img: alumni.h_alumni_img // Populate image data (URL from the backend)
    });
  };

  const handleDelete = async (h_alumni_id) => {
    if (window.confirm('Are you sure you want to delete this honoured alumni?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/honoured/alumni/delete/${h_alumni_id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok) {
          alert('Honoured alumni deleted successfully!');
          setAlumni(alumni.filter(item => item.h_alumni_id !== h_alumni_id));
        } else {
          alert('Failed to delete honoured alumni.');
        }
      } catch (error) {
        console.error('Error deleting honoured alumni:', error);
        alert('Failed to delete honoured alumni.');
      }
    }
  };

  const handleUpdate = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('h_alumni_name', formData.h_alumni_name);
    formDataToSend.append('h_alumni_position', formData.h_alumni_position);
    formDataToSend.append('h_alumni_desc', formData.h_alumni_desc);
  
    // Check if the image is a File and append accordingly
    if (typeof formData.h_alumni_img === 'object') {
      formDataToSend.append('h_alumni_img', formData.h_alumni_img);
    } else if (formData.h_alumni_img) {
      // If it's not a file but the image data exists, send it as a string (URL)
      formDataToSend.append('h_alumni_img', formData.h_alumni_img);
    }
    console.log(typeof formData.h_alumni_img, formData.h_alumni_img);

  
    try {
      const response = await fetch(`http://localhost:3000/api/honoured/alumni/update/${editAlumniId}`, {
        method: 'PUT',
        credentials: 'include',
        body: formDataToSend
      });
  
      if (response.ok) {
        alert('Honoured alumni updated successfully!');
        setAlumni(alumni.map(item => (item.h_alumni_id === editAlumniId ? { ...item, ...formData } : item)));
        setEditAlumniId(null);
        setFormData({
          h_alumni_name: '',
          h_alumni_position: '',
          h_alumni_desc: '',
          h_alumni_img: '' // Reset image on update
        });
      } else {
        alert('Failed to update honoured alumni.');
      }
    } catch (error) {
      console.error('Error updating honoured alumni:', error);
      alert('Failed to update honoured alumni.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-center text-blue-700 underline text-2xl font-bold mb-4">Honoured Alumni</h2>
      
      {alumni.length === 0 ? (
        <p className="text-center text-gray-500">No honoured alumni found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Image</th> {/* Added Image Column */}
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map(item => (
              <tr key={item.h_alumni_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{item.h_alumni_name}</td>
                <td className="border border-gray-300 p-2">{item.h_alumni_position}</td>
                <td className="border border-gray-300 p-2">{item.h_alumni_desc}</td>
                <td className="border border-gray-300 p-2">
                  {/* Display image from the backend URL */}
                  {item.h_alumni_img && (
                    
                  <img
                    src={`http://localhost:3000/${item.h_alumni_img}.replace(/\\/g, '\')`}
                    alt="Honoured Alumni"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                </td>
                <td className="flex gap-3 border border-gray-300 p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(item.h_alumni_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editAlumniId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-11/12 max-w-2xl">
            <h3 className="text-lg font-semibold mb-2">Edit Honoured Alumni</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={formData.h_alumni_name}
                onChange={(e) => setFormData({ ...formData, h_alumni_name: e.target.value })}
                required
                className="border rounded p-1 mb-2 w-full"
              />
              <label className="block mb-2">Position</label>
              <input
                type="text"
                placeholder="Position"
                value={formData.h_alumni_position}
                onChange={(e) => setFormData({ ...formData, h_alumni_position: e.target.value })}
                required
                className="border rounded p-1 mb-2 w-full"
              />
              <label className="block mb-2">Description</label>
              <textarea
                placeholder="Description"
                value={formData.h_alumni_desc}
                onChange={(e) => setFormData({ ...formData, h_alumni_desc: e.target.value })}
                required
                className="border rounded p-1 mb-2 w-full"
              />
              <label className="block mb-2">Image</label>
              <input
                type="file"
                onChange={(e) => setFormData({ ...formData, h_alumni_img: e.target.files[0] })}
                className="border rounded p-1 mb-2 w-full"
              />
              {formData.h_alumni_img &&
                (typeof formData.h_alumni_img === 'object' ? (
                  <img
                    src={URL.createObjectURL(formData.h_alumni_img)}
                    alt="preview"
                    className="w-20 h-20 object-cover mb-2"
                  />
                ) : (
                  <img
                    src={`http://localhost:3000/${formData.h_alumni_img}`}
                    alt="preview"
                    className="w-20 h-20 object-cover mb-2"
                  />
                ))}


              <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
              <button type="button" className="ml-2 bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setEditAlumniId(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewHonouredAlumni;
