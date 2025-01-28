import React from 'react';
import d_alumni1 from "../../assets/d_alumni1.jpeg";
import d_alumni2 from "../../assets/d_alumni2.jpg";
import Srinivas_img from '../../assets/kondapalli srinivas.jpg';
import Nav from '../Nav';

const HonouredAlumni = () => {
  return (
    <>
      <Nav />
      <div className="w-full sm:h-auto h-[600px] bg-gray-100 rounded-lg shadow-xl p-4 px-8">
        <h1 className="text-4xl text-[#FF8343] font-bold text-center mb-4 mt-5">Role of Honours</h1>
        <p className="text-center text-gray-700 sm:text-lg text-sm max-w-2xl w-2/3 mb-5 sm:mb-0 mx-auto">
          Celebrating the extraordinary achievements of our alumni who have made significant contributions to society.
        </p>

        {/* Alumni Cards Container */}
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 mt-8">

          {/* Alumni Card 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden py-4 transform transition-all duration-300 hover:scale-105">
            <div className="sm:flex block items-center sm:justify-start justify-center p-4 text-center sm:text-left">
              <div className="rounded-full p-1 mx-auto sm:mx-0 ml-[23%]">
                <img className="w-40 h-40 object-cover rounded-full border-4 border-[#FF8343] p-1" src={d_alumni1} alt="Alumni Image" />
              </div>
              <div className="sm:ml-6 ml-0 mt-4 sm:mt-0 w-full sm:w-2/3">
                <h2 className="text-[#FF8343] text-xl font-bold">Mr. K Sivakumar Naidu, I.A.S</h2>
                <h3 className="mt-2 text-lg font-medium text-gray-800">Additional Commissioner, Municipal Corporation</h3>
                <p className="text-base font-medium text-gray-600 mb-3 mt-4">
                  "An exemplary leader in public service, Mr. Sivakumar's dedication to the nation is unparalleled. His work has inspired countless individuals in the public sector, and his leadership continues to shape the future of urban governance."
                </p>
                {/* <a
                  href="https://www.linkedin.com/in/sivakumar-k-b-5b96aa105/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FF8343] text-white text-sm font-semibold py-2 px-4 rounded-md mt-4 hover:bg-[#e0723d] transition duration-300"
                >
                  View LinkedIn Profile
                </a> */}
              </div>
            </div>
          </div>

          {/* Alumni Card 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden py-4 transform transition-all duration-300 hover:scale-105">
            <div className="sm:flex block items-center sm:justify-start justify-center p-4 text-center sm:text-left">
              <div className="rounded-full p-1 mx-auto sm:mx-0 ml-[23%]">
                <img className="w-40 h-40 object-cover rounded-full border-4 border-[#FF8343] p-1" src={d_alumni2} alt="Alumni Image" />
              </div>
              <div className="sm:ml-6 ml-0 mt-4 sm:mt-0 w-full sm:w-2/3">
                <h2 className="text-[#FF8343] text-xl font-bold">Mrs. B. Sandya</h2>
                <h3 className="mt-2 text-lg font-medium text-gray-800">Municipal Commissioner</h3>
                <p className="text-base font-medium text-gray-600 mb-3 mt-4">
                  "Mrs. Sandya has transformed urban governance through her leadership in enhancing civic services, infrastructure, and sustainable development. Her strategies have improved waste management, mobility, and public health while promoting inclusive growth. Her dedication has inspired future public service leaders."
                </p>
                {/* <a
                  href="https://www.linkedin.com/in/sivakumar-k-b-5b96aa105/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FF8343] text-white text-sm font-semibold py-2 px-4 rounded-md mt-4 hover:bg-[#e0723d] transition duration-300"
                >
                  View LinkedIn Profile
                </a> */}
              </div>
            </div>
          </div>

          {/* Alumni Card 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden py-4 transform transition-all duration-300 hover:scale-105">
            <div className="sm:flex block items-center sm:justify-start justify-center p-4 text-center sm:text-left">
              <div className="rounded-full p-1 mx-auto sm:mx-0 ml-[23%]">
                <img className="w-40 h-40 object-cover rounded-full border-4 border-[#FF8343] p-1" src="http://115.241.205.4/alumni/img/img_dalumni_ParadesiNaidu.jpg" alt="Alumni Image" />
              </div>
              <div className="sm:ml-6 ml-0 mt-4 sm:mt-0 w-full sm:w-2/3">
                <h2 className="text-[#FF8343] text-xl font-bold">Mr. V. Paradesi Naidu</h2>
                <h3 className="mt-2 text-lg font-medium text-gray-800">Commercial Tax Officer</h3>
                <p className="text-base font-medium text-gray-600 mb-3 mt-4">
                  "From finance to leadership, Mr. Paradesi Naidu continues to inspire future leaders in the public sector. His efforts in streamlining tax administration have set new standards for fiscal governance."
                </p>
                {/* <a
                  href="https://www.linkedin.com/in/sivakumar-k-b-5b96aa105/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FF8343] text-white text-sm font-semibold py-2 px-4 rounded-md mt-4 hover:bg-[#e0723d] transition duration-300"
                >
                  View LinkedIn Profile
                </a> */}
              </div>
            </div>
          </div>

          {/* Alumni Card 4 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden py-4 transform transition-all duration-300 hover:scale-105">
            <div className="sm:flex block items-center sm:justify-start justify-center p-4 text-center sm:text-left">
              <div className="rounded-full p-1 mx-auto sm:mx-0 ml-[23%]">
                <img className="w-40 h-40 object-cover rounded-full border-4 border-[#FF8343] p-1" src={Srinivas_img} alt="Alumni Image" />
              </div>
              <div className="sm:ml-6 ml-0 mt-4 sm:mt-0 w-full sm:w-2/3">
                <h2 className="text-[#FF8343] text-xl font-bold">Mr. Kondapalli Srinivas Rao</h2>
                <h3 className="mt-2 text-lg font-medium text-gray-800">Minister and MLA of Gajapathinagaram</h3>
                <p className="text-base font-medium text-gray-600 mb-3 mt-4">
                  "A true embodiment of service, Mr. Srinivas’s contributions to the state's development are invaluable. His leadership and commitment to the public have made him a respected figure in the political landscape."
                </p>
                {/* <a
                  href="https://www.linkedin.com/in/sivakumar-k-b-5b96aa105/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FF8343] text-white text-sm font-semibold py-2 px-4 rounded-md mt-4 hover:bg-[#e0723d] transition duration-300"
                >
                  View LinkedIn Profile
                </a> */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default HonouredAlumni;
