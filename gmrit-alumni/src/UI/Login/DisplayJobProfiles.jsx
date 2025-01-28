import React from 'react'

const DisplayJobProfiles = () => {
    const [jobExperiences, setJobExperiences] = useState([]);

    useEffect(() => {
      const fetchJobExperiences = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api//${alumniId}`, {
            withCredentials: true, // Send cookies for authentication
          });
          setJobExperiences(response.data.data);
        } catch (error) {
          console.error("Error fetching job experiences:", error.response ? error.response.data : error.message);
        }
      };
  
      fetchJobExperiences();
    }, [alumniId]);
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Job Experiences</h3>
        <div className="flex space-x-4">
          {jobExperiences.length > 0 ? (
            jobExperiences.map((job) => (
              <div key={job.idEmployment_id} className="bg-green-100 p-4 rounded-lg text-center">
                <p className="text-lg font-medium">{job.employment_history}</p>
                <p className="text-green-600">{job.designation}</p>
                <p className="text-gray-500">{job.organization}</p>
                <p className="text-gray-500">{job.start_date} - {job.end_date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No job experiences found.</p>
          )}
        </div>
      </div>
    );
}

export default DisplayJobProfiles