import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { facultyData } from './facultyData';

const Profile = () => {
  const [member, setMember] = useState(null);
  const { name } = useParams();
  
  useEffect(() => {
    const foundMember = facultyData[0].find(member => member.name === name);
    setMember(foundMember);
  }, [name]);

  if (!member) {
    return <div className="text-center text-red-600">Faculty member not found</div>;
  }

  return (
    <div className="container w-[95%] md:w-[80%] mx-auto px-4 md:px-6 py-8 bg-white shadow-xl rounded-xl animate-fadeIn">
      <div className="text-center mb-8">
        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full border-4 border-blue-800 shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mt-4 hover:text-purple-700 transition-colors duration-300">{member.name}</h2>
        <p className="text-lg md:text-xl text-gray-700 mt-2">Date of Birth: {member.dateOfBirth}</p>
        <p className="text-md md:text-lg text-blue-600 mt-2 font-semibold">{member.address}</p>
        <p className="text-sm md:text-md text-gray-600 mt-1 italic">Date of Joining: {member.dateOfJoining}</p>
      </div>

      {/* Academic Profile */}
      <div className="mt-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-purple-800 underline mb-4">Academic Profile</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-700 border-collapse shadow-lg">
            <thead>
              <tr className="bg-purple-100">
                <th className="px-4 py-2 border-b-2 border-gray-300 text-purple-800">Qualification</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-purple-800">Board/University</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-purple-800">Class/Division</th>
              </tr>
            </thead>
            <tbody>
              {member.academicProfile.map((qual, index) => (
                <tr key={index} className={`hover:bg-blue-50 transition-colors duration-300 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <td className="px-4 py-2 border-b border-gray-300">{qual.qualification}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{qual.boardUniversity}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{qual.classDivision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Professional Experience */}
      <div className="mt-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-purple-800 underline mb-4">Professional Experience</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-700 border-collapse shadow-lg">
            <thead>
              <tr className="bg-purple-100">
                <th className="px-4 py-2 border-b-2 border-gray-300 text-purple-800">Designation</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-purple-800">Employer</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-purple-800">Length of Service</th>
              </tr>
            </thead>
            <tbody>
              {member.professionalExperience.map((exp, index) => (
                <tr key={index} className={`hover:bg-blue-50 transition-colors duration-300 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <td className="px-4 py-2 border-b border-gray-300">{exp.designation}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{exp.employer}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{exp.lengthOfService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Research and FDPs */}
      <div className="mt-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-purple-800 underline mb-4">Research and FDPs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-700 border-collapse shadow-lg">
            <thead>
              <tr className="bg-purple-100">
                <th className="px-4 py-2 border-b-2 border-gray-300 text-purple-800">Category</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-purple-800">Count</th>
              </tr>
            </thead>
            <tbody>
              {['workshopsFDPs', 'onlineCourses', 'conferencePapers', 'journalPapers', 'books', 'patents', 'grants'].map((item, index) => (
                <tr key={index} className={`hover:bg-blue-50 transition-colors duration-300 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <td className="px-4 py-2 border-b border-gray-300 capitalize">{item.replace(/([A-Z])/g, ' $1')}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{member.researchFDPs[item]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accreditations */}
      {member.accreditations && (
      <div className="mt-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-purple-800 underline mb-4">Accreditations</h3>
        <p className="text-gray-700 mt-2 animate-fadeIn leading-relaxed bg-gray-100 p-4 rounded-lg shadow-md">
          {member.accreditations?.overview}
        </p>
        <ul className="list-disc pl-8 mt-4 text-gray-700 space-y-2">
          {member.accreditations?.approvals.map((approval, index) => (
            <li key={index} className="animate-fadeIn hover:text-blue-800 transition-colors duration-300">
              {approval}
            </li>
          ))}
        </ul>
      </div>
)}


      {/* Contact Button */}
      <div className="mt-8 text-center">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 animate-pulse">
          Contact {member.name}
        </button>
      </div>
    </div>
  );
};

export default Profile;
