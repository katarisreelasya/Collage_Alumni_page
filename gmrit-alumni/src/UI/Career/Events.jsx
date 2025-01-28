import React, { useEffect, useState } from "react";
import TopBar from "../TopBar";
import Nav from "../Nav";
import Image5 from "../../assets/image5.jpg";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Convert image URL to Base64
  const convertImageToBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  };

  // Fetch events data and convert images to Base64
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/events", {
        credentials: "include", // Include credentials
      });
      const data = await response.json();

      // Convert each image to Base64
      for (let event of data) {
        if (event.post_images && event.post_images.length > 0) {
          const base64Images = await Promise.all(
            event.post_images.map((image) =>
              convertImageToBase64(`http://localhost:3000/api/events/${image}`)
            )
          );
          event.post_images = base64Images;
        }
      }

      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle image navigation
  const handleNextImage = (postId) => {
    setCurrentImageIndex((prevIndex) => ({
      ...prevIndex,
      [postId]:
        (prevIndex[postId] + 1) %
        events.find((event) => event.post_id === postId).post_images.length,
    }));
  };

  const handlePrevImage = (postId) => {
    setCurrentImageIndex((prevIndex) => ({
      ...prevIndex,
      [postId]:
        (prevIndex[postId] - 1 +
          events.find((event) => event.post_id === postId).post_images.length) %
        events.find((event) => event.post_id === postId).post_images.length,
    }));
  };

  return (
    <>
      <Nav />
      <TopBar img={Image5} name="College Events" />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
        <h1 className="text-3xl font-bold mb-8">College Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {events.map((event) => (
            <div
              key={event.post_id}
              className="bg-white rounded-md shadow-md text-gray-800"
            >
              {/* Display Event Image with navigation */}
              <div className="relative">
                {event.post_images && event.post_images.length > 0 ? (
                  <>
                    <img
                      src={event.post_images[currentImageIndex[event.post_id] || 0]}
                      alt={`Event Image ${currentImageIndex[event.post_id] + 1}`}
                      className="object-cover object-center w-full rounded-t-md h-48 bg-gray-200"
                    />
                    {event.post_images.length > 1 && (
                      <>
                        <button
                          onClick={() => handlePrevImage(event.post_id)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                        >
                          &#8249;
                        </button>
                        <button
                          onClick={() => handleNextImage(event.post_id)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                        >
                          &#8250;
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <p className="col-span-2 text-gray-500">No images available</p>
                )}
              </div>

              {/* Event Content */}
              <div className="p-4 space-y-4">
                <h2 className="text-2xl font-semibold">{event.post_title}</h2>
                <p className="text-gray-600">{event.post_description}</p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(event.post_date).toLocaleDateString()} | Time:{" "}
                  {event.post_time}
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
