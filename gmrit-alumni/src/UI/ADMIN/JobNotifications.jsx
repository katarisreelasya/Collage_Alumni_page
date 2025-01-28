import React, { useEffect, useState } from "react";
import JobTable from "./components/JobTable";

const API_URL = 'http://localhost:3000/api/jobs';

const JobData = () => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/get/all`, {
          credentials: 'include',
        });
        const data = await response.json();
        setJobList(data.jobs);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch job data. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle Delete
  const handleDelete = async (job_id) => {
    try {
      const response = await fetch(`${API_URL}/delete/${job_id}`, { // Update this URL
        method: "DELETE",
        credentials: 'include', // Ensure credentials are included
      });

      if (response.ok) {
        setJobList((prevJobList) =>
          prevJobList.filter((job) => job.job_id !== job_id)
        );
        alert("Job deleted successfully");
      } else {
        const errorText = await response.text();
        alert("Failed to delete job: " + errorText);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Error deleting job: " + error.message);
    }
  };

  // Handle Edit
  const handleEdit = async (updatedJob) => {
    try {
      const response = await fetch(`${API_URL}/update/${updatedJob.job_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(updatedJob),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to update job: ${errorData.message || 'An unknown error occurred.'}`);
        return;
      }

      setJobList((prevJobList) =>
        prevJobList.map((job) =>
          job.job_id === updatedJob.job_id ? updatedJob : job
        )
      );
      alert("Job updated successfully");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Error updating job");
    }
  };

  return (
    <div className="container mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <JobTable jobList={jobList} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default JobData;
