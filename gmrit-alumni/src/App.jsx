import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './UI/Home/HomePage';
import AboutPage from './UI/About/About';
import BoardMem from './UI/Board/BoardMem';
import Login from './UI/Login/Login';
import Student from './UI/Directory/Student';
import Registration from './UI/GetInTouch/Registration';
import CareerAlerts from './UI/Career/CareerAlerts';
import JobDetails from './UI/Career/JobDetails';
import Innovators from './UI/Innovators/Innovators';
import NispStartupPolicy from './UI/Innovators/NispStartupPolicy';
import AndhraPradeshStartupPolicy from './UI/Innovators/AndhraPradeshStartupPolicy';
import GMRStartupPolicy from './UI/Innovators/GMRStartUpPolicy';
import Entrepreneurs from './UI/Innovators/Entrepreneurs';
import StartupsIncubated from './UI/Innovators/StartupsIncubated';
import Profile  from './UI/Board/Profile';
// import princi3 from '../src/assets/princi3.jpeg'
import AdminLogin from './UI/ADMIN/AdminLogin';
import Admin from './UI/ADMIN/Admin';
import Placement from './UI/Directory/Placement';
import AlumniDetails from './UI/Directory/AlumniDetails';
import ErrorPage from './UI/404/ErrorPage';
import ContactUs from './UI/404/ContactUs';
import EventsList from './UI/Events/EventsList';
import Gallery from './UI/Gallery/GalleryPage';
import AlumniData from './UI/ADMIN/components/AlumniData';
import AdminHome from './UI/ADMIN/AdminHome';
import JobNotifications from './UI/ADMIN/JobNotifications';
import AddJobNotifications from './UI/ADMIN/AddJobNotifications';
import AddAlumni from './UI/ADMIN/AddAlumni';
import CreateThread from './UI/Forum/CreateThread';
import ThreadList from './UI/Forum/ThreadList';
import Thread from './UI/Forum/Thread';
import ReplyForm from './UI/Forum/ReplyForm';
import AlumniDonationForm from './UI/Network/AlumniDonationForm';
import Network from './UI/Network/Network';
import ClgEvents from './UI/Career/Events';




// import DashBoard from './UI/ADMIN/DashBoard';
import { useUser } from './store/userStore';
import UserProfileHome from './UI/Login/UserProfileHome';
import UserProfile from './UI/Login/UserProfile';
import  AlumniRequests  from './UI/ADMIN/AlumniRequests';
import RequestApproveOrReject from './UI/ADMIN/RequestApproveOrReject';
import AlumniProfile from './UI/Login/AlumniProfile';
import  Events  from './UI/ADMIN/Events';
import AddEvents from './UI/ADMIN/AddEvents';
import GalleryPage from './UI/Gallery/GalleryPage';
import AddMeets from './UI/ADMIN/AddMeets';
import Meets from './UI/ADMIN/Meets';
import AddWebinar from './UI/ADMIN/AddWebinar';
import Webinar from './UI/ADMIN/Webinar';
import AddClgEvent from './UI/ADMIN/AddClgEvent';
import ClgPost from './UI/ADMIN/ClgPost';
import CsvUpload from './UI/ADMIN/CsvUploader';
import HonouredAlumni from './UI/Honoured Alumni/HonouredAlumni';
import AddHonouredAlumni from './UI/ADMIN/AddHonouredAlumni';
import ViewHonouredAlumni from './UI/ADMIN/ViewHonouredAlumni';
import ResetPassword from './UI/Login/ResetPassword';
import BirthdaysCard from './UI/Home/BirthdaysCard';



const App = () => {
  const {setUser,user} = useUser();

  useEffect(() => {
    // Function to fetch user data from the /me endpoint
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/alumni/me`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        
        setUser(data.user);
        console.log(data.user);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error (e.g., redirect to login if unauthorized)
      }
    };

    // Call the function when the component is mounted
    fetchUserData();
  }, [setUser]); // Ensure effect runs only once after mount

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/About/BoardMembers" element={<BoardMem />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/stu_directory" element={<Student />} />
        <Route path="/Placement_directory" element={<Placement />} />
        <Route path="/birthday_cards" element={<BirthdaysCard />} />
        <Route path="/Placement_directory" element={<Placement />} />
        <Route path="/alumni/:login_id" element={<AlumniDetails />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/career_alerts" element={<CareerAlerts />} />
        <Route path="/career_alerts/:jobId" element={<JobDetails />} />
        <Route path="/updates_gatherings" element={<EventsList />} />
        <Route path="/innovators" element={<Innovators />} />
        <Route path="/innovators/overview" element={<Innovators />} />
        <Route path="/innovators/nisp_startup_policy" element={<NispStartupPolicy />} />
        <Route path="/innovators/ap_startup_policy" element={<AndhraPradeshStartupPolicy />} />
        <Route path="/innovators/gmrit_startup_policy" element={<GMRStartupPolicy />} />
        <Route path="/innovators/successful_entrepreneurs" element={<Entrepreneurs />} />
        <Route path="/innovators/startups_incubated" element={<StartupsIncubated />} />
        <Route path="/About/BoardMembers/:name" element={<Profile />} />
        <Route path="/contributions" element={<AlumniDonationForm />} />
        <Route path="/user/profile" element={<UserProfileHome user={user}/>}/>
        <Route path="/user/profile/edit" element={<UserProfile user={user}/>}/>
        <Route path="/Admin/login" element={<AdminLogin />} />
        <Route path="/Network/Network_Hub" element={<Network />} />
        <Route path="/gallery" element={<GalleryPage/>} />
        <Route path="/latest_news" element={<ClgEvents/>} />
        
        {/* Reset password */}
        < Route path="/reset_password" element={<ResetPassword/>} />

        {/* Admin section */}
        <Route path="/Admin/" element={<Admin />}>
          <Route index element={<AdminHome />} /> 
          <Route path="Job_Notifications" element={<JobNotifications />} />
          <Route path="Alumni_Data" element={<AlumniData />} />
          <Route path="Add_Job_Notifications" element={<AddJobNotifications/>} />
          <Route path="Add_Alumni" element={<AddAlumni />} />
          <Route path="Add_Alumni_csv" element={<CsvUpload />} />
          <Route path="Add_honoured_alumni" element={<AddHonouredAlumni />} />
          <Route path="alumni_requests" element={<AlumniRequests />} />
          <Route path="request/:requestId" element={<RequestApproveOrReject/>} />
          <Route path="events" element={<Events />} />
          <Route path="add_events" element={<AddEvents />} />
          <Route path="add_meets" element={<AddMeets />} />
          <Route path="view_meets" element={<Meets />} />
          <Route path="add_webinar" element={<AddWebinar />} /> 
          <Route path="View_webinar" element={<Webinar />} /> 
          <Route path="add_posts" element={<AddClgEvent/>} /> 
          <Route path="View_Posts" element={<ClgPost/>} /> 
          <Route path="View_honoured_alumni" element={<ViewHonouredAlumni />} />
        </Route>
        
        {/* <Route path="/gallery" element={<Gallery />} /> */}
        <Route path="/honoured_alumni" element={<HonouredAlumni />} />
        <Route path="/latest_news" element={<Gallery />} />


        {/* routes for forum */}
        <Route path="/forum" element={<ThreadList />} />
        
        <Route path="/forum/create-thread" element={<CreateThread />} />

        <Route path="/forum/threads/:thread_id" element={<Thread />} />

        <Route path="/forum/threads/:thread_id/replies/add" element={<ReplyForm />} />

        {/* <Route path="/About/BoardMembers/:profileId" element={<Profile />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;