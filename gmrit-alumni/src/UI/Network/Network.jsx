import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import Slider from 'react-slick';
import lab from '../../assets/lab.jpg';
import web from '../../assets/webi2.jpg';
import Nav from '../Nav';
import TopBar from '../TopBar';
import meet from '../../assets/meet.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Network = () => {
  // State to store meeting and webinar data fetched from the APIs
  const [meetings, setMeetings] = useState([]);
  const [webinars, setWebinars] = useState([]);

  // Fetch meetings and webinars data from APIs when the component mounts
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/meet/get/all', {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies, etc.) with the request
        });
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error('Error fetching meeting data:', error);
      }
    };

    const fetchWebinars = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/webinar/get/all', {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies, etc.) with the request
        });
        const data = await response.json();

        console.log('Webinars data:', data); // Log the response to see its structure
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setWebinars(data);
        } else {
          console.error('Invalid webinars data format');
        }
      } catch (error) {
        console.error('Error fetching webinar data:', error);
      }
    };

    fetchMeetings();
    fetchWebinars();
  }, []);

  // Sample alumni data with email contact
  const alumniData = [
    { id: 1, name: 'Priya Ramesh', story: "She went on to co-found a tech startup that focuses on AI-driven healthcare solutions. Her company recently received a significant investment and is revolutionizing patient care through innovative diagnostic tools. Priya's journey from a passionate student to a successful entrepreneur is an inspiration to many.", email: "alumni1@example.com" },
    { id: 2, name: 'Rohit Kumar', story: "Rohit Kumar, an alumnus from the Mechanical Engineering department, has made significant strides in the automotive industry. After completing his Masters in Automotive Engineering abroad, he joined a leading automobile company and played a crucial role in designing eco-friendly, electric vehicles. His contributions are making a substantial impact on sustainable transportation.", email: "alumni2@example.com" },
    { id: 3, name: 'Anjali Mehta', story: "Anjali Mehta, who graduated from GMRIT with a degree in Electronics and Communication Engineering, now works as a Senior Network Engineer at a global telecommunications company. She has been instrumental in developing next-generation network solutions and has received multiple accolades for her innovative contributions. Anjali’s dedication to her field has not only elevated her career but also advanced technological progress.", email: "alumni3@example.com" },
  ];

  // Carousel settings for Alumni Stories
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <Nav />
      <TopBar img={lab} name="Network Hub" />
      <div className="container mx-auto p-8 space-y-10">

        {/* Alumni Page Description Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mb-12">
          <img
            src="https://alumnihub.isavesit.org.in/static/media/Image3.5a78e629.svg"
            alt="Alumni Page Illustration"
            className="w-full md:w-1/2 max-w-sm object-cover"
          />
          <div className="md:w-1/2 pl-8">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">Welcome to the Alumni Hub</h2>
            <p className="text-gray-600">
              Discover inspiring stories from our alumni, connect with professionals in your field, and gain insights into various career pathways. Our platform fosters a vibrant network that supports personal and professional growth for both students and graduates.
            </p>
            <p className="mt-4 text-gray-600">
              Stay engaged with our upcoming online sessions, workshops, and exclusive networking events, all designed to enhance your journey through mentorship and collaboration. Join our growing community and connect with your peers!
            </p>
          </div>
        </div>

        {/* Online Meetings and Sessions */}
        <div className="my-8 p-4">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Join Online Meetings & Sessions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetings.length === 0 ? (
              <p className="text-center text-gray-600">No current meetings ...</p>
            ) : (
              meetings.map((meeting) => (
                <div
            key={meeting.meet_id}
            className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-200 flex flex-col"
          >
            <img
              src={meet}
              alt="Meeting logo"
              className="w-full h-32 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{meeting.title}</h3>
            <p className="text-gray-600 mb-4">{meeting.description}</p>
            <p className="text-gray-600"><strong>Date:</strong> {new Date(meeting.date).toLocaleDateString()}</p>
            <p className="text-gray-600"><strong>Time:</strong> {new Date(`1970-01-01T${meeting.time}`).toLocaleTimeString()}</p>
            <p className="text-gray-600"><strong>Meeting Deadline:</strong> {new Date(meeting.deadline).toLocaleString()}</p>
            <div className="mt-auto">
              <a
                href={meeting.meet_link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors duration-200 text-center block"
              >
                Join Now
              </a>
            </div>
            </div>

              ))
            )}
          </div>
        </div>

        {/* Alumni Stories and Testimonials with SVG Side by Side */}
        <div>
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Alumni Stories and Testimonials</h2>
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 mb-12">
            {/* Carousel for Alumni Stories on the Left */}
            <div className="lg:w-1/2 bg-white shadow-lg rounded-lg p-6">
              <Slider {...carouselSettings}>
                {alumniData.map((alumni) => (
                  <div key={alumni.id} className="flex flex-col items-center text-center">
                    <h3 className="text-lg font-bold text-gray-800">{alumni.name}</h3>
                    <p className="text-gray-600">"{alumni.story}"</p>
                    <a href={`mailto:${alumni.email}`} className="text-blue-500 flex items-center mt-4 hover:underline">
                      <FaEnvelope className="mr-2" /> Contact
                    </a>
                  </div>
                ))}
              </Slider>
            </div>

            {/* SVG Image on the Right */}
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="https://alumnihub.isavesit.org.in/static/media/Image2.c2623077.svg"
                alt="Alumni Networking Graphic"
                className="w-full max-w-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Webinars Section */}
<div className="my-8">
  <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Upcoming Webinars</h2>
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {webinars.length === 0 ? (
      <p className="text-center text-gray-600">No current webinars...</p>
    ) : (
      webinars.map((webinar) => (
        <div key={webinar.webinar_id} className="bg-white shadow-lg rounded-lg p-6">
          <img
            src={webinar.thumbnail || web} // Placeholder if no thumbnail is available
            alt={webinar.title}
            className="w-full h-32 object-cover rounded-t-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">{webinar.title}</h3>
          <p className="text-gray-600 mb-4">{webinar.description}</p>
          
          {/* New Fields for Time and Date */}
          <p className="text-gray-600"><strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}</p>
          <p className="text-gray-600"><strong>Time:</strong> {new Date(`1970-01-01T${webinar.time}`).toLocaleTimeString()}</p>

          <a
            href={webinar.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors duration-200 text-center block"
          >
            Register Now
          </a>
        </div>
      ))
    )}
  </div>
</div>


      </div>
    </>
  );
};

export default Network;
