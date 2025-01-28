import React, { useEffect, useState } from 'react';
import { useUser } from '../../store/userStore'; // Import the custom hook to access user context
import axios from 'axios';
import img from "../../assets/digi-pic.jpeg";
import { Toast } from 'flowbite-react';
import Nav from "../../UI/Nav";
import { Link, useNavigate } from 'react-router-dom';

const UserProfileHome = () => {
  const [studentData, setStudentData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [showAchievementForm, setShowAchievementForm] = useState(false); // State to toggle form visibility
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '' ,achievement_date:''}); // State for new achievement input
  const [newJob, setNewJob] = useState({
    organization: "",
    designation: "",
    department: "",
    experience_years:"",
    work_phone: "",
    work_email: "",
  });
  const [jobExperiencesform, setJobExperiencesform] = useState(false);
  
  const [jobExperiencesEditform, setJobExperiencesEditform] = useState(false);
  const [experiencesEditData, setExperiencesEditData] = useState({}); // To store the experience data when editing

  const [experiences, setJobExperiences] = useState([{
    organization: "",
    designation: "",
    department: "",
    experience_years:"",
    work_phone: "",
    work_email: "",
  }]);

  const [showAchievementEditform, setShowAchievementEditform] = useState(false);
  const [showAchievementEditData, setShowAchievementEditData] = useState({}); // To store the achievements data when editing

  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser(); // Get the user from UserContext
  const loginId = user.login_id; // Get the login_id from the user context
  const navigate=useNavigate();
  const handleInputChangeJob = (e) => {
    // console.log("triggered change job");
    
    const { name, value } = e.target;
    // console.log(name,value);
    
    setNewJob({ ...newJob, [name]: value });
  };
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/achievements/${loginId}`, {
          method: 'GET',
          credentials: 'include', // Add credentials to the fetch request
        });
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        setAchievements(data.result); // Assuming the response has an achievements field
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };
    const fetchExperience = async()=>{
      try { 
        
        const response = await fetch(`http://localhost:3000/api/alumni/employee/history/${loginId}`, {
        method: 'GET',
        credentials: 'include', // Add credentials to the fetch request
      });
      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }
      const data = await response.json();
      setJobExperiences(data.data); 
        
      } catch (error) {
        console.error('Error fetching job details')
      }
    }
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/alumni/get/${loginId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        setStudentData(data.alumni[0]);
        
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    // Fetch friends data from the API
  const fetchFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/get_friends/${loginId}`,{
        credentials:'include',
      });
      const data = await response.json();
      if (response.ok) {
        setFriends(data.friends);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

    if (loginId) {
      fetchStudentData();
      fetchAchievements();
      fetchExperience();
      fetchFriends();
    }
  }, [loginId]);

 // Delete a friend
 const handleDeleteFriend = async (friendId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this friend?");
  if (confirmDelete) {
    try {
      // Assuming there's an API endpoint to delete a friend
      const response = await fetch(`http://localhost:3000/api/delete_friend/${friendId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFriends(friends.filter(friend => friend.friend_id !== friendId));
        alert("Friend deleted successfully.");
      } else {
        alert("Failed to delete friend.");
      }
    } catch (error) {
      console.error('Error deleting friend:', error);
    }
  }
};


  const handleAddAchievement = () => {
    setShowAchievementForm(!showAchievementForm); // Toggle form visibility
  };

  const handleInputChange = (e) => {
    // console.log("triggered onchange event");
    
    const { name, value } = e.target;
    // console.log(value,"val for uinput");
    setNewAchievement({ ...newAchievement, [name]: value });
    
  };

  const formatDate = (data) => {
    const date = new Date(data);
const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' });
return formattedDate;
  }

  const handleSubmitAcheivements = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/alumni/acheivements/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(newAchievement), // Send the new achievement data
      });
      if (!response.ok) {
        throw new Error('Failed to add achievement');
      }
      // Optionally fetch achievements again to update the list
      alert("new achivement added")
      setAchievements((prevAchievements) => [...prevAchievements, newAchievement]);
      setNewAchievement({ title: '', description: '' ,achievement_date:''}); // Clear the form
      setShowAchievementForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    console.log(newJob,"this is newjob");

    try {
      const response = await axios.post(`http://localhost:3000/api/alumni/employee/history/${loginId}`, newJob, {
        withCredentials: true, // Send cookies for authentication
      });
      alert("Job added successfully");
      setJobExperiences((prevJobs) => [...prevJobs, newJob]);
      setNewJob({ designation: '', description: '' ,department:"",organization:'',work_email:'',experience_years:''}); // Clear the form
      setJobExperiencesform(false);
      // Clear the form or show success notification
    } catch (error) {
      console.error("Error adding job:", error.response ? error.response.data : error.message);
    }
  };
  
  const handleLogout = async () => {
    // Confirm before logout
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return; // Exit if the user cancels
  
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include', // Ensures cookies (like authToken) are included in the request
      });
  
      if (response.ok) {
        console.log('Logged out and cookie cleared');
        // Redirect to login page or another page after successful logout
        navigate('/');
        window.location.reload();
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleEditExperience = (experience) => {
    setExperiencesEditData(experience); // Set the experience data to edit
    setJobExperiencesEditform(true); // Show the edit form
    console.log(experiencesEditData);
  };

  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setExperiencesEditData({ ...experiencesEditData, [name]: value });
  };

  const handleSubmitEditExperience = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/alumni/employee/history/update/${experiencesEditData.idEmployment_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experiencesEditData),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update experience');
      }
      const updatedExperience = await response.json();
      // setJobExperiences(experiences.map(exp => (exp.id === updatedExperience.id ? updatedExperience : exp))); // Update the experience list
      setJobExperiencesEditform(false); // Hide the edit form
      setExperiencesEditData({}); // Reset edit data
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };


  const handleDeleteExperience = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this experience?");
    if (!isConfirmed) return; // Exit the function if the user selects "Cancel"
  
    try {
        const response = await fetch(`http://localhost:3000/api/alumni/employee/history/delete/${id}`, {
            credentials: "include",
            method: 'DELETE',
        });
        
        if (response.ok) {
            setJobExperiences((experiences) => experiences.filter((experience) => experience.id !== id));
            alert("Deleted successfully...");
        }
    } catch (error) {
        console.error("Error deleting experience:", error);
    }
};

const handleEditAchievements = (achievement) => {
  setShowAchievementEditData(achievement); // Set the experience data to edit
  setShowAchievementEditform(true); // Show the edit form
  console.log(showAchievementEditData);
};

const handleInputChangeAchEdit = (e) => {
  const { name, value } = e.target;
  setShowAchievementEditData({ ...showAchievementEditData, [name]: value });
};

const handleSubmitEditAchievements = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:3000/api/achievements/update/${showAchievementEditData.achievement_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(showAchievementEditData),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update Achievement');
      }
      const updatedAchievement = await response.json();
      // setAchievements(achievements.map(ach => (ach.id === updatedAchievement.id ? updatedAchievement : ach))); // Update the experience list
      setShowAchievementEditform(false); // Hide the edit form
      setShowAchievementEditData({}); // Reset edit data
    } catch (error) {
      console.error('Error updating Achievement:', error);
    }
  };

  const handleDeleteAchievement = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Achievement?");
    if (!isConfirmed) return; // Exit the function if the user selects "Cancel"
  
    try {
        const response = await fetch(`http://localhost:3000/api/achievements/delete/${id}`, {
            credentials: "include",
            method: 'DELETE',
        });
        
        if (response.ok) {
            setAchievements((achievements) => achievements.filter((achievement) => achievement.id !== id));
            alert("Deleted successfully...");
        }
    } catch (error) {
        console.error("Error deleting Achievement:", error);
    }
};


  return (
    <>
    {/* <Nav/> */}
    <div className="min-h-screen bg-blue-100">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex space-x-8">
          {/* Left Profile Information */}
          <div className="flex justify-center bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen mt-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <Link to="/" className='text-left mt-3'>
                <svg class="w-6 h-6 text-blue-800 dark:text-blue-800  ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                </svg>
                </Link>
        <div className="flex flex-col items-center p-6 space-y-4">
          
          {/* Profile Image */}
          <div className="bg-gradient-to-br from-blue-300 to-indigo-500 rounded-full w-32 h-32 flex items-center justify-center shadow-md">
            
            <img
              src={img}
              alt="Profile"
              className="rounded-full border-4 border-white w-full h-full object-cover"
            />
          </div>

          {/* Name and Username */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-semibold text-gray-800">{studentData ? studentData.name_of_the_alumni : 'Loading...'}</h2>
            <p className="text-sm text-gray-500">@{studentData ? studentData.login_id : 'loading'}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-white text-red-500 border border-red-500 rounded-xl px-4 py-2 hover:bg-red-500 hover:text-white hover:border hover:border-red-500 transition duration-200"
            >
            Logout
          </button>


        </div>

        {/* Personal Information */}
        <div className="bg-gray-100 p-6 rounded-b-lg">
          <h3 className="flex gap-4 text-lg font-semibold text-blue-700 border-b border-blue-200 pb-2">
            Personal Information
            {/* Edit Icon */}
            <Link to="/user/profile/edit">
            <svg 
              className="w-6 h-6 text-blue-800 dark:text-blue"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              
            >
              <path
                stroke="currentColor"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
              />
            </svg>
            </Link>
          </h3>
          

          <ul className="mt-4 space-y-2 text-gray-700">
            <li><span className="font-semibold">Email:</span> {studentData ? studentData.mail_id : 'Loading...'}</li>
            <li><span className="font-semibold">Phone:</span> {studentData ? studentData.phone_no : 'Loading...'}</li>
            <li><span className="font-semibold">Location:</span> {studentData ? `${studentData.city}, ${studentData.state}` : 'Loading...'}</li>
            <li><span className="font-semibold">Course:</span> {studentData ? studentData.course : 'Loading...'}</li>
            <li><span className="font-semibold">Branch:</span> {studentData ? studentData.branch : 'Loading...'}</li>
            <li><span className="font-semibold">Year of Passing:</span> {studentData ? studentData.passed : 'Loading...'}</li>
          </ul>
          
        </div>
        <div className='flex gap-2 text-center mx-auto p-5 sm:px-12 px-0'>
            <svg class=" mt-4 w-5 h-5 text-blue-900 dark:text-blue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6.94318 11h-.85227l.96023-2.90909h1.07954L9.09091 11h-.85227l-.63637-2.10795h-.02272L6.94318 11Zm-.15909-1.14773h1.60227v.59093H6.78409v-.59093ZM9.37109 11V8.09091h1.25571c.2159 0 .4048.04261.5667.12784.162.08523.2879.20502.3779.35937.0899.15436.1349.33476.1349.5412 0 .20833-.0464.38873-.1392.54119-.0918.15246-.2211.26989-.3878.35229-.1657.0824-.3593.1236-.5809.1236h-.75003v-.61367h.59093c.0928 0 .1719-.0161.2372-.0483.0663-.03314.1169-.08002.152-.14062.036-.06061.054-.13211.054-.21449 0-.08334-.018-.15436-.054-.21307-.0351-.05966-.0857-.10511-.152-.13636-.0653-.0322-.1444-.0483-.2372-.0483h-.2784V11h-.78981Zm3.41481-2.90909V11h-.7898V8.09091h.7898Z"/>
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8.31818 2c-.55228 0-1 .44772-1 1v.72878c-.06079.0236-.12113.04809-.18098.07346l-.55228-.53789c-.38828-.37817-1.00715-.37817-1.39543 0L3.30923 5.09564c-.19327.18824-.30229.44659-.30229.71638 0 .26979.10902.52813.30229.71637l.52844.51468c-.01982.04526-.03911.0908-.05785.13662H3c-.55228 0-1 .44771-1 1v2.58981c0 .5523.44772 1 1 1h.77982c.01873.0458.03802.0914.05783.1366l-.52847.5147c-.19327.1883-.30228.4466-.30228.7164 0 .2698.10901.5281.30228.7164l1.88026 1.8313c.38828.3781 1.00715.3781 1.39544 0l.55228-.5379c.05987.0253.12021.0498.18102.0734v.7288c0 .5523.44772 1 1 1h2.65912c.5523 0 1-.4477 1-1v-.7288c.1316-.0511.2612-.1064.3883-.1657l.5435.2614v.4339c0 .5523.4477 1 1 1H14v.0625c0 .5523.4477 1 1 1h.0909v.0625c0 .5523.4477 1 1 1h.6844l.4952.4823c1.1648 1.1345 3.0214 1.1345 4.1863 0l.2409-.2347c.1961-.191.3053-.454.3022-.7277-.0031-.2737-.1183-.5342-.3187-.7207l-6.2162-5.7847c.0173-.0398.0342-.0798.0506-.12h.7799c.5522 0 1-.4477 1-1V8.17969c0-.55229-.4478-1-1-1h-.7799c-.0187-.04583-.038-.09139-.0578-.13666l.5284-.51464c.1933-.18824.3023-.44659.3023-.71638 0-.26979-.109-.52813-.3023-.71637l-1.8803-1.8313c-.3883-.37816-1.0071-.37816-1.3954 0l-.5523.53788c-.0598-.02536-.1201-.04985-.1809-.07344V3c0-.55228-.4477-1-1-1H8.31818Z"/>
            </svg>
        <Link to='/reset_password'>
          <p className='text-blue-600 font-semibold rounded-3xl transition-all duration-300 ease-in-out transform hover:scale-105 py-3'>
            Change password
          </p>
          </Link>
          
        </div>
      </div>
    </div>


          {/* Right Content Area */}
          <div className="w-3/4 space-y-8 mt-2">
            {/* Experience Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
  <h3 className="text-xl font-semibold text-blue-700">Buddies</h3>
  <p className='text-gray-700'>
    "Add your fellow classmates and buddies and expand your network to build meaningful connections!"
  </p>
  <div className="flex flex-wrap gap-4">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend.friend_id} className="bg-gray-200 p-4 rounded-lg mt-3 text-center w-full sm:w-full lg:w-1/3">
              <p className="text-lg font-bold">{friend.friend_name}</p>
              <p className="text-black">Email: {friend.friend_mail}</p>
              <p className="text-black">Branch: {friend.friend_branch}</p>
              <p className="text-black">Phone: {friend.friend_phno}</p>
              <button
                onClick={() => handleDeleteFriend(friend.friend_id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No friends found.</p>
        )}
      </div>
      </div>
          
            {/* Experience Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
  <h3 className="text-xl font-semibold text-blue-700">Experience</h3>
  <p>
    {jobExperiencesEditform && (
    <form onSubmit={handleSubmitEditExperience} className="mt-4 bg-gray-100 p-4 rounded-lg">
      <div className="mb-2">
        <label htmlFor="organization" className="block font-medium text-gray-700">
          Organization
        </label>
        <input
          type="text"
          name="organization"
          value={experiencesEditData.organization}
          onChange={handleInputChangeEdit}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          
        />
      </div>
      <div className="mb-2">
        <label htmlFor="designation" className="block font-medium text-gray-700">
          Designation
        </label>
        <textarea
          name="designation"
          value={experiencesEditData.designation}
          onChange={handleInputChangeEdit}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          
        />
      </div>
      <div className="mb-2">
        <label htmlFor="designation" className="block font-medium text-gray-700">
          Department
        </label>
        <textarea
          name="department"
          value={experiencesEditData.department}
          onChange={handleInputChangeEdit}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          
        />
      </div>
      <div className="mb-2">
        <label htmlFor="work_email" className="block font-medium text-gray-700">
          Work Email
        </label>
        <input
          name="work_email"
          value={experiencesEditData.work_email}
          onChange={handleInputChangeEdit}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          
          type="email"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="start_date" className="block font-medium text-gray-700">
        Experience Years
        </label>
        <input
          name="experience_years"
          onChange={handleInputChangeEdit}
          value={experiencesEditData.experience_years}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          
          type="text"
        />
      </div>
      
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setJobExperiencesEditform(false)}
          className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-red-600 transition-all"
        >
          Back
        </button>
      </div>
    </form>
  )}
  </p>
  <div className="flex flex-wrap gap-4">
    
    {experiences.length > 0 ? (
      experiences.map((experience) => (
        <div
          key={experience.idEmployment_id}
          className="bg-gray-200 p-4 rounded-lg mt-3 text-center w-full sm:w-1/2 lg:w-1/4"
        >
          <div className="flex gap-2 justify-between w-full">
            {/* <div onClick={() => handleEditExperience(experience.idEmployment_id)}> */}
            
            
            <div onClick={() => handleEditExperience(experience)}>
              <svg
                className="w-4 h-4 text-blue-600 dark:text-white cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                />
              </svg>
            </div>
            <div onClick={() => handleDeleteExperience(experience.idEmployment_id)}>
              <svg
                className="w-4 h-4 text-red-600 dark:text-white cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </div>
          </div>
          <p className="text-lg font-bold">{experience.title}</p>
          <p className="text-lg text-black font-medium">{experience.organization}</p>
          <p className="text-black">{experience.designation}</p>
          <p className="text-black">Dept - {experience.department}</p>
          
            <p className=" text-black">{experience.experience_years}</p>
            <p className=" text-black">Work mail - {experience.work_email}</p>
          
        </div>
      ))
    ) : (
      <p className="text-gray-500">No Experience found.</p>
    )}
  </div>
  <p
    className="text-gray-500 mt-2 cursor-pointer"
    onClick={setJobExperiencesform}
  >
    + Add Job
  </p>
  {jobExperiencesform && (
    <form onSubmit={handleAddJob} className="mt-4 bg-gray-100 p-4 rounded-lg">
      <div className="mb-2">
        <label htmlFor="organization" className="block font-medium text-gray-700">
          Organization
        </label>
        <input
          type="text"
          name="organization"
          value={newJob.organization}
          onChange={handleInputChangeJob}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="designation" className="block font-medium text-gray-700">
          Designation
        </label>
        <textarea
          name="designation"
          value={newJob.designation}
          onChange={handleInputChangeJob}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="department" className="block font-medium text-gray-700">
          Department
        </label>
        <textarea
          name="department"
          value={newJob.department}
          onChange={handleInputChangeJob}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="work_email" className="block font-medium text-gray-700">
          Work Email
        </label>
        <input
          name="work_email"
          value={newJob.work_email}
          onChange={handleInputChangeJob}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
         
          type="email"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="experience_years" className="block font-medium text-gray-700">
          Experience Years
        </label>
        <input
          name="experience_years"
          onChange={handleInputChangeJob}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          placeholder='2000 - 2023 or 2020 - present'
          type="text"
        />
      </div>
      
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setJobExperiencesform(false)}
          className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-red-600 transition-all"
        >
          Back
        </button>
      </div>
    </form>
  )}
            </div>


            {/* Achievements Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
  <h3 className="text-xl text-blue-700 font-semibold">Achievements</h3>
  {showAchievementEditform && (
    <form onSubmit={handleSubmitEditAchievements} className="mt-4 bg-gray-100 p-4 rounded-lg">
      <div className="mb-2">
        <label htmlFor="title" className="block font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={showAchievementEditData.title}
          onChange={handleInputChangeAchEdit}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          
        />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="block font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={showAchievementEditData.description}
          onChange={handleInputChangeAchEdit}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          
        />
      </div>
      <div className="mb-2">
        <label htmlFor="achievement_date" className="block font-medium text-gray-700">
          Achievement Date
        </label>
        <input
          name="achievement_date"
          value={showAchievementEditData.achievement_date}
          type="date"
          onChange={handleInputChangeAchEdit}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => showAchievementEditform(false)} // Hide form without submission
          className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-red-600 transition-all"
        >
          Back
        </button>
      </div>
    </form>
  )}
  <div className="flex flex-wrap gap-4">
    {achievements?.length > 0 ? (
      achievements.map((achievement) => (
        <div
          key={achievement.achievement_id}
          className="bg-gray-200 p-4 rounded-lg text-center mt-3 w-full sm:w-1/2 lg:w-1/4"
        >
          <div className="flex gap-2 justify-between">
            <div
              onClick={() => handleEditAchievements(achievement)}
            >
              <svg
                className="w-4 h-4 text-blue-600 dark:text-white cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                />
              </svg>
            </div>
            <div
              onClick={() => handleDeleteAchievement(achievement.achievement_id)}
            >
              <svg
                className="w-4 h-4 text-red-600 dark:text-white cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </div>
          </div>
          <p className="text-lg font-medium">{achievement.title}</p>
          <p className="text-black">{achievement.description}</p>
          <p className="text-black">{formatDate(achievement.achievement_date)}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No achievements found.</p>
    )}
  </div>
  <p
    className="text-gray-500 mt-2 cursor-pointer"
    onClick={handleAddAchievement} // Toggle form visibility on click
  >
    + Add Achievements
  </p>
  {showAchievementForm && (
    <form onSubmit={handleSubmitAcheivements} className="mt-4 bg-gray-100 p-4 rounded-lg">
      <div className="mb-2">
        <label htmlFor="title" className="block font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={newAchievement.title}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="block font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={newAchievement.description}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="achievement_date" className="block font-medium text-gray-700">
          Achievement Date
        </label>
        <input
          name="achievement_date"
          type="date"
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          placeholder='add correct month and year'
          
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setShowAchievementForm(false)} // Hide form without submission
          className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-red-600 transition-all"
        >
          Back
        </button>
      </div>
    </form>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfileHome;
