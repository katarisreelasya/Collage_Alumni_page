import React, { useState } from "react";
import Modal from "react-modal";

const AlumniTable = ({ alumniList, onDelete, onEdit, authToken }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  // Open the modal and populate with data
  const openEditModal = (alumni) => {
    setSelectedAlumni(alumni);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlumni(null);
  };

  // Handle form submission for editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/alumni/update/${selectedAlumni.login_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Use the authToken prop
        },
        credentials: 'include', // Include credentials for the request
        body: JSON.stringify(selectedAlumni), // Convert the selectedAlumni object to JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Parse the response data
      // onEdit(selectedAlumni); // Call parent edit handler
      closeModal();
      alert("Alumni data updated successfully!"); // Success alert
    } catch (error) {
      console.error("Error updating alumni", error);
      alert("Error updating alumni data!"); // Error alert
    }
  };

  // Handle delete
  const handleDelete = async (login_id) => {
    if (window.confirm("Are you sure you want to delete this alumni?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/alumni/delete/${login_id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
          credentials: 'include',
        });
  
        if (!response.ok) {
          const errorText = await response.text(); // Get the error response text
          throw new Error(`Network response was not ok: ${errorText}`);
        }
        else{
          alert("Alumni deleted succesfully...")
        }
  
        // onDelete(login_id);
      } catch (error) {
        console.error("Error deleting alumni:", error);
        alert("Error deleting alumni data!"); 
      }
    }
  };

  

  return (
    <div className="container mx-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            {/* <th className="px-4 py-2">S.No</th> */}
            <th className="px-4 border border-gray-300 py-2">Login ID</th>
            <th className="px-4 border border-gray-300 py-2">Name</th>
            <th className="px-4 border border-gray-300 py-2">Gender</th>
            <th className="px-4 border border-gray-300 py-2">Course</th>
            <th className="px-4 border border-gray-300 py-2">Branch</th>
            <th className="px-4 border border-gray-300 py-2">DOB</th>
            <th className="px-4 border border-gray-300 py-2">Passed</th>
            <th className="px-4 border border-gray-300 py-2">Address</th>
            <th className="px-4 border border-gray-300 py-2">State</th>
            <th className="px-4 border border-gray-300 py-2">Country</th>
            <th className="px-4 border border-gray-300 py-2">Zipcode</th>
            <th className="px-4 border border-gray-300 py-2">Phone</th>
            <th className="px-4 border border-gray-300 py-2">Email</th>
            <th className="px-4 border border-gray-300 py-2">DOR</th>
            <th className="px-4 border border-gray-300 py-2">Parent Number</th>
            <th className="px-4 border border-gray-300 py-2">Company</th>
            <th className="px-4 border border-gray-300 py-2">Designation</th>
            <th className="px-4 border border-gray-300 py-2">Department</th>
            <th className="px-4 border border-gray-300 py-2">Location</th>
            <th className="px-4 border border-gray-300 py-2">Actions</th>
            

          </tr>
        </thead>
        <tbody>
          {alumniList.map((alumni) => (
            <tr key={alumni.login_id} className="bg-white">
              {/* <td className="border px-4 py-2">{alumni.s_no}</td> */}
              <td className="border px-4 py-2">{alumni.login_id}</td>
              <td className="border px-4 py-2">{alumni.name_of_the_alumni}</td>
              <td className="border px-4 py-2">{alumni.gender}</td>
              <td className="border px-4 py-2">{alumni.course}</td>
              <td className="border px-4 py-2">{alumni.branch}</td>
              <td className="border px-4 py-2">{alumni.dob}</td>
              <td className="border px-4 py-2">{alumni.passed}</td>
              <td className="border px-4 py-2">{alumni.address}</td>
              <td className="border px-4 py-2">{alumni.state}</td>
              <td className="border px-4 py-2">{alumni.country}</td>
              <td className="border px-4 py-2">{alumni.zipcode}</td>
              <td className="border px-4 py-2">{alumni.phone}</td>
              <td className="border px-4 py-2">{alumni.mail_id}</td>
              <td className="border px-4 py-2">{alumni.dor}</td>
              <td className="border px-4 py-2">{alumni.parent_number}</td>
              <td className="border px-4 py-2">{alumni.company}</td>
              <td className="border px-4 py-2">{alumni.designation}</td>
              <td className="border px-4 py-2">{alumni.dept}</td>
              <td className="border px-4 py-2">{alumni.current_location}</td>
              <td className="border px-4 py-2 flex">
                <button
                  onClick={() => openEditModal(alumni)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(alumni.login_id)}
                  className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing */}
      {isModalOpen && selectedAlumni && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl mb-4">Edit Alumni</h2>
            <form onSubmit={handleEditSubmit}>
              {[
              
                { label: "Login ID", field: "login_id" },
                { label: "Name", field: "name_of_the_alumni" },
                { label: "Gender", field: "gender" },
                { label: "Course", field: "course" },
                { label: "Branch", field: "branch" },
                { label: "DOB", field: "dob" },
                { label: "Passed", field: "passed" },
                { label: "Address", field: "address" },
                { label: "State", field: "state" },
                { label: "Country", field: "country" },
                { label: "Zipcode", field: "zipcode" },
                { label: "Phone", field: "phone" },
                { label: "Email", field: "mail_id" },
                { label: "DOR", field: "dor" },
                { label: "Parent Number", field: "parent_number" },
                { label: "Company", field: "company" },
                { label: "Designation", field: "designation" },
                { label: "Department", field: "dept" },
                { label: "Location", field: "current_location" },
              ].map(({ label, field }) => (
                <div className="mb-4" key={field}>
                  <label className="block text-sm font-medium">{label}</label>
                  <input
                    type="text"
                    value={selectedAlumni[field] || ""}
                    onChange={(e) =>
                      setSelectedAlumni({
                        ...selectedAlumni,
                        [field]: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md"
                  />
                </div>
              ))}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Alumni
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AlumniTable;
