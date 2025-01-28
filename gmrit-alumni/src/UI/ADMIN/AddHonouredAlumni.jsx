import React, { useState } from 'react';

const AddHonouredAlumni = () => {
  // State for storing form data and the uploaded image
  const [formData, setFormData] = useState({
    hAlumniName: '',
    hAlumniPosition: '',
    hAlumniDesc: '',
    hAlumniImg: null,  // Image file for upload
  });

  // Handle form data changes (including file input for the image)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        hAlumniImg: files[0],  // Set the selected image file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,  // Handle text inputs
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('h_alumni_name', formData.hAlumniName);
    data.append('h_alumni_position', formData.hAlumniPosition);
    data.append('h_alumni_desc', formData.hAlumniDesc);
  
    // Append the image file to the FormData object if present
    if (formData.hAlumniImg) {
      data.append('h_alumni_img', formData.hAlumniImg);
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/honoured/alumni/add', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Honoured alumni added successfully!');
        setFormData({
          hAlumniName: '',
          hAlumniPosition: '',
          hAlumniDesc: '',
          hAlumniImg: null,  // Reset image file after submission
        });
      } else {
        alert(result.message || 'Error adding honoured alumni');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while adding honoured alumni');
    }
  };
  

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Honoured Alumni</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hAlumniName" className="block text-sm font-medium">Alumni Name:</label>
          <input
            type="text"
            id="hAlumniName"
            name="hAlumniName"
            className="mt-1 p-2 border rounded w-full"
            value={formData.hAlumniName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="hAlumniPosition" className="block text-sm font-medium">Position:</label>
          <input
            type="text"
            id="hAlumniPosition"
            name="hAlumniPosition"
            className="mt-1 p-2 border rounded w-full"
            value={formData.hAlumniPosition}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="hAlumniDesc" className="block text-sm font-medium">Description:</label>
          <textarea
            id="hAlumniDesc"
            name="hAlumniDesc"
            className="mt-1 p-2 border rounded w-full"
            value={formData.hAlumniDesc}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="hAlumniImg" className="block text-sm font-medium">Upload Image:</label>
          <input
            type="file"
            id="hAlumniImg"
            name="hAlumniImg"
            className="mt-1 p-2 border rounded w-full"
            onChange={handleChange}
            accept="image/*"  // Only allow image files
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Honoured Alumni
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHonouredAlumni;
