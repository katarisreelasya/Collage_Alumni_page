import React, { useState } from "react";

// JobTable Component
const JobTable = ({ jobList, onEdit, onDelete }) => {
  const [editingJob, setEditingJob] = useState(null);
  // Utility function to format date from 'yyyy-mm-dd' to 'dd-mm-yyyy'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleEdit = (job) => {
    setEditingJob(job); // Open edit modal
  };

  const handleDelete = (job_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job posting?"
    );
    if (confirmDelete) {
      onDelete(job_id);
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    onEdit(editingJob);
    setEditingJob(null); // Close edit modal after submission
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Job Listings</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 bg-gray-200 p-2">Company</th>
            <th className="border border-gray-300 bg-gray-200 p-2">Position</th>
            <th className="border border-gray-300 bg-gray-200 p-2">Description</th>
            <th className="border border-gray-300 bg-gray-200 p-2">Requirements</th>
            <th className="border border-gray-300 bg-gray-200 p-2">Application Deadline</th>
            <th className="border border-gray-300 bg-gray-200 p-2">Posting Date</th>
            <th className="border border-gray-300 bg-gray-200 p-2">Job Link</th>
            <th className="border border-gray-300 bg-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobList.map((job) => (
            <tr key={job.job_id}>
              <td className="border p-2">{job.Company}</td>
              <td className="border p-2">{job.position}</td>
              <td className="border p-2">{job.description}</td>
              <td className="border p-2">{job.requirements}</td>
              <td className="border p-2">
                {formatDate(job.application_deadline)}
              </td>
              <td className="border p-2">
                {formatDate(job.posting_date)}
              </td>
              <td className="border p-2">
                {/* Directly display the job link instead of a button */}
                <a href={job.job_link} target="_blank" rel="noopener noreferrer">
                  {job.job_link}
                </a>
              </td>
              <td className=" flex border p-2">
                <button
                  className="bg-blue-500 text-white p-1 rounded mr-2 flex gap-2"
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => handleDelete(job.job_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Job */}
      {editingJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-h-[80vh] overflow-y-auto w-11/12 md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl mb-4">Edit Job</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Job ID</label>
                <input
                  type="text"
                  value={editingJob.job_id}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Company</label>
                <input
                  type="text"
                  value={editingJob.Company}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, Company: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Position</label>
                <input
                  type="text"
                  value={editingJob.position}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, position: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea
                  value={editingJob.description}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Requirements</label>
                <textarea
                  value={editingJob.requirements}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      requirements: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Application Deadline</label>
                <input
                  type="date"
                  value={editingJob.application_deadline.split('T')[0]}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, application_deadline: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Posting Date</label>
                <input
                  type="datetime-local"
                  value={editingJob.posting_date.split('T')[0]}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, posting_date: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Job Link</label>
                <input
                  type="text"
                  value={editingJob.job_link}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, job_link: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded mr-2"
                  onClick={() => setEditingJob(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded"
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

export default JobTable;
