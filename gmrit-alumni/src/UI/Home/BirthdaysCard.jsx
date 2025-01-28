import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";  // Importing react-slick for carousel functionality
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";  // Import slick carousel styles
import { useUser } from "../../store/userStore";

const BirthdaysCard = () => {
  const { user } = useUser();
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/api/todays_birthdays";

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch birthdays");
        }
        const data = await response.json();

        // Get today's date (in MM-DD format)
        const today = new Date();
        const todayDate = `${today.getMonth() + 1}-${today.getDate()}`;

        // Filter the birthdays for today
        const todaysBirthdays = data.filter((student) => {
          const studentDob = new Date(student.dob);
          const studentDate = `${studentDob.getMonth() + 1}-${studentDob.getDate()}`;
          return studentDate === todayDate;
        });

        setBirthdays(todaysBirthdays || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, []);

  const handleViewClick = (loginId) => {
    if (user){
      navigate(`/alumni/${loginId}`);
    } else {
       navigate('/login');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!birthdays.length) {
    return (
      <div className="p-6 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#00327a] mb-6">
          Today's Birthdays 🎉
        </h1>
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-[#00327a] text-lg mb-4">
            It seems there are no birthdays to celebrate today.
          </p>
          <p className="text-center text-gray-600 text-md">
            Check back later for upcoming celebrations, or feel free to wish
            your fellow alumni a happy birthday if you know it's their special
            day!
          </p>
        </div>
      </div>
    );
  }

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite looping
    speed: 500, // Speed of sliding
    slidesToShow: 3, // Show 3 cards at a time
    slidesToScroll: 1, // Scroll one card at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1000, // Speed of autoplay
    pauseOnHover: true, // Pause autoplay on hover
    responsive: [
      {
        breakpoint: 1024, // For medium screens
        settings: {
          slidesToShow: 2, // Show 2 cards on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // For small screens
        settings: {
          slidesToShow: 1, // Show 1 card on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-blue-100 ">
      <h1 className="text-4xl font-bold text-center text-[#00327a] mb-8 my-auto">
        Today's Birthdays 🎉
      </h1>
      <p className="text-center text-gray-600 text-md mb-5">
        Celebrate the special day with your fellow alumni! 🎉 Wishing them a happy birthday and feel free to share your best wishes!
      </p>

      <Slider {...settings}> {/* Using Slider component for carousel */}
        {birthdays.map((student, index) => (
        <div className="flex items-center justify-center">
          <div
          key={index}
          className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 mx-4 my-4"  // Added my-4 for vertical spacing
        >
        
            <div className="bg-[#5584C6] p-4">
              <h2 className="text-xl font-bold text-white">{student.name}</h2>
              <p className="text-white text-md mt-2">
                Branch: {student.branch}
              </p>
            </div>
            <div className="p-4">
              <p className="text-gray-700 italic text-center">
                Wishing you a wonderful birthday! 🎂
              </p>
              <button
                onClick={() => handleViewClick(student.login_id)}
                className="mt-4 bg-[#00327a] text-white py-2 px-4 rounded-lg block mx-auto hover:bg-[#0056b3] transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BirthdaysCard;
