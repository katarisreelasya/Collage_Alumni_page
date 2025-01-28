import React, { useState } from 'react';
import Nav from '../Nav';
import board from '../../assets/boardcpy.jpg';
import { facultyData } from './facultyData';
import { Link } from 'react-router-dom';

const BoardMem = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const HoverImageWithText = (props) => {
    return (
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <img
          src={props.img}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
            <nav className="flex items-center justify-center mt-32 text-gray-300">
              <a href="/" className="hover:text-[#00327a]">Home</a>
              <span className="mx-2 hover:text-[#00327a]">{'>>'}</span>
              <a href="/contact" className="hover:text-[#00327a]">{props.name}</a>
            </nav>
          </h1>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Nav />
      <HoverImageWithText img={board} name="Board Members" />

      {/* Description */}
      <div className="py-6 md:py-12 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 animate-slideInRight">Board Members</h2>
          <p className="text-sm md:text-lg text-gray-700 animate-fadeIn">
            The GMR Institute of Technology (GMRIT) is guided by a team of dedicated and visionary board members who ensure the institution's mission of delivering high-quality education and fostering industry-academia collaboration.
          </p>
        </div>
      </div>

      {/* Heading Members of GMRIT Alumni Association */}
      <div className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 animate-slideInLeft">Members of GMRIT Alumni Association</h2>
        </div>
      </div>

      {/* Board Members Grid */}
      <div className="bg-white min-h-screen flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-6xl">
          {facultyData[0].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-50 hover:shadow-xl"
            >
              <img
                className="rounded-t-lg w-full h-56 object-cover"
                src={member.image}
                alt={member.name}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-blue-800">
                  {member.name}
                </h2>
                <h4 className="text-lg ont-normal text-blue-800">
                  Designation: {member.Designation}
                </h4>
                <p className="text-blue-600 text-sm">{member.position}</p>
                <button
                  onClick={() => handleViewProfile(member)}
                  className="mt-4 inline-block bg-blue-800 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  <Link to={member.name}>View Profile</Link>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SVG Section */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full mt-8">
          <path fill="#002f6c" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,170.7C672,139,768,85,864,58.7C960,32,1056,32,1152,69.3C1248,107,1344,181,1392,218.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Display selected profile information */}
      {selectedProfile && (
        <div className="bg-gray-100 p-6 md:p-8 mt-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">{selectedProfile.name}</h3>
          <p className="mb-4"><strong>Date of Birth:</strong> {selectedProfile.dateOfBirth}</p>
          <p className="mb-4"><strong>Address:</strong> {selectedProfile.address}</p>
          <p className="mb-4"><strong>Date of Joining:</strong> {selectedProfile.dateOfJoining}</p>
          <h4 className="text-lg md:text-xl font-semibold mb-2">Academic Profile</h4>
          <ul className="mb-4 list-disc list-inside">
            {selectedProfile.academicProfile.map((item, idx) => (
              <li key={idx}>{item.qualification} - {item.boardUniversity} ({item.classDivision})</li>
            ))}
          </ul>
          <h4 className="text-lg md:text-xl font-semibold mb-2">Professional Experience</h4>
          <ul className="mb-4 list-disc list-inside">
            {selectedProfile.professionalExperience.map((item, idx) => (
              <li key={idx}>{item.designation} at {item.employer} ({item.lengthOfService})</li>
            ))}
          </ul>
          <h4 className="text-lg md:text-xl font-semibold mb-2">Research and FDPs</h4>
          <ul className="list-disc list-inside">
            <li>Workshops/FDPs: {selectedProfile.researchFDPs.workshopsFDPs}</li>
            <li>Online Courses: {selectedProfile.researchFDPs.onlineCourses}</li>
            <li>Conference Papers: {selectedProfile.researchFDPs.conferencePapers}</li>
            <li>Journal Papers: {selectedProfile.researchFDPs.journalPapers}</li>
            <li>Books: {selectedProfile.researchFDPs.books}</li>
            <li>Patents: {selectedProfile.researchFDPs.patents}</li>
            <li>Grants: {selectedProfile.researchFDPs.grants}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BoardMem;
