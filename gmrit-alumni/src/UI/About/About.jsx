import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios';
import landing from '../../assets/Landing.png';
import founder from '../../assets/founder.jpeg';
import Nav from '../Nav';
import TopBar from '../TopBar';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DoughnutC from '../ADMIN/chats/DoughnutC'; // Import the DoughnutC component
import Chart from 'chart.js/auto'; // Import Chart.js for charting
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles

// Carousel Data
const alumniStories = [
  {
    name: "John Doe",
    story: "CEO of Tech Innovators Inc. John credits GMRIT for fostering his problem-solving skills and entrepreneurial spirit.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Jane Smith",
    story: "Renowned Data Scientist at Global Analytics, Jane's foundation at GMRIT was instrumental in shaping her career.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mark Wilson",
    story: "Founder of Green Energy Solutions, Mark's journey at GMRIT instilled a passion for sustainability and innovation.",
    image: "https://via.placeholder.com/150",
  },
];

const About = () => {
  const [totalAlumni, setTotalAlumni] = useState(0);

  useEffect(() => {
    // Fetch total alumni count on component mount
    const fetchData = async () => {
      try {
        const { data: alumniData } = await axios.get('http://localhost:3000/api/alumni/count');
        setTotalAlumni(alumniData.totalAlumniCount);
      } catch (error) {
        console.error("Error fetching alumni count", error);
      }
    };
    fetchData();

    // Initialize AOS (Animate On Scroll)
    AOS.init();
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div>
      <Nav />
      <div>
        {/* Introduction Section */}
        <TopBar img={landing} name="About Alumni" />

        {/* Alumni Overview */}
        <div className="py-8 md:py-12 bg-gradient-to-r from-blue-100 to-blue-300">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-bold text-center mb-6 text-blue-700 animate-slideInRight">
              GMRIT Alumni Network
            </h2>
            <p className="text-lg text-gray-800 text-center animate-fadeIn">
              A global community of innovators, achievers, and leaders. GMRIT alumni are making significant contributions across industries and the globe.
            </p>
          </div>
        </div>

        {/* Vision and Mission */}
        <div className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-bold text-center mb-6 text-blue-700 animate-slideInLeft">
              Our Vision & Mission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-gradient-to-r from-blue-50 to-white p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                <h3 className="text-2xl font-semibold text-blue-600">Vision</h3>
                <p className="mt-4 text-gray-700">
                  To create a thriving global community of GMRIT alumni, fostering collaboration, innovation, and excellence while contributing positively to the institute and society.
                </p>
              </div>
              <div className="card bg-gradient-to-r from-blue-50 to-white p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                <h3 className="text-2xl font-semibold text-blue-600">Mission</h3>
                <p className="mt-4 text-gray-700">
                  To strengthen the bond between GMRIT and its alumni by providing platforms for networking, professional development, and giving back to the community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Founder's Message */}
        <div className="py-8 md:py-12 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 animate-slideInRight">
              A Message from Our Founder
            </h2>
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={founder}
                alt="Founder"
                className="w-32 h-32 md:w-48 md:h-48 rounded-full mb-6 md:mb-0 md:mr-6 border-4 border-gray-300 hover:border-blue-400 transition duration-300 hover:scale-105 transform animate-fadeIn"
              />
              <div className="text-base md:text-lg text-gray-700 animate-fadeIn">
                <p className="mb-4">
                  G. M. Rao, founder of GMRIT and chairman of GMR Group, expresses pride in the achievements of GMRIT alumni. The network is a testament to the institute’s commitment to excellence, ethics, and empowerment.
                </p>
                <p className="mb-4">
                  Our alumni community is an integral part of GMRIT's legacy, and their success stories inspire future generations to aim high and achieve greatness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 animate-slideInLeft">
              Why Join the GMRIT Alumni Network?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card bg-gray-50 p-3 md:p-4 shadow-md hover:shadow-lg transition duration-300 animate-zoomIn">
                <h3 className="text-base md:text-lg font-semibold">Global Connections</h3>
                <p className="text-sm md:text-base text-gray-700 mt-2 md:mt-3">
                  Connect with a global network of GMRIT alumni to explore opportunities and foster collaborations.
                </p>
              </div>
              <div className="card bg-gray-50 p-3 md:p-4 shadow-md hover:shadow-lg transition duration-300 animate-zoomIn">
                <h3 className="text-base md:text-lg font-semibold">Mentorship Programs</h3>
                <p className="text-sm md:text-base text-gray-700 mt-2 md:mt-3">
                  Guide and inspire current students by sharing your expertise and experiences through structured mentorship programs.
                </p>
              </div>
              <div className="card bg-gray-50 p-3 md:p-4 shadow-md hover:shadow-lg transition duration-300 animate-zoomIn">
                <h3 className="text-base md:text-lg font-semibold">Professional Growth</h3>
                <p className="text-sm md:text-base text-gray-700 mt-2 md:mt-3">
                  Leverage alumni events, workshops, and networking opportunities for career advancement and skill enhancement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alumni Carousel */}
        <div className="py-8 md:py-12 bg-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-bold text-center mb-6 text-blue-700 animate-slideInLeft">
              Success Stories
            </h2>
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={3000}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
            >
              {alumniStories.map((alumni, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-32 h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-lg font-semibold text-center">{alumni.name}</h3>
                  <p className="text-sm text-gray-700 text-center mt-2">{alumni.story}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 animate-slideInLeft">
              Alumni Distribution by Department
            </h2>
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white rounded-lg shadow-lg p-6">
                {/* Left Side: Total Alumni Count */}
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-4">Total Alumni</h3>
                    <p className="text-4xl font-bold text-blue-700">{totalAlumni}</p>
                    <a
                      href="/stu_directory"
                      className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-blue-700 transition duration-300"
                    >
                      View Details
                    </a>
                  </div>
                </div>

                {/* Right Side: Doughnut Chart */}
                <div className="md:w-2/3 flex justify-center">
                  <div className="w-80 h-80">
                    <DoughnutC />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-8 md:py-12 bg-blue-400 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 animate-bounce">Join the Alumni Network</h2>
            <p className="text-lg mb-6">
              Stay connected with the GMRIT family. Sign up for our alumni portal to access exclusive opportunities and events.
            </p>
            <a
              href="/Registration"
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-100 transition duration-300"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
