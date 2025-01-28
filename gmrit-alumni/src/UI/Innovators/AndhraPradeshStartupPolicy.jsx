import React from 'react';
import FloatingMenu from './FloatingMenu';
import APstartuppolicy from '../../assets/ap_startup_policy.jpg';

const objs = [
  { obj: "100 Incubators/ Accelerators to be established." },
  { obj: "1 million sq. ft. of Incubation Space to be developed." },
  { obj: "5,000 Companies & Startups to be incubated." },
  { obj: "Venture Capital of INR 1000 Crores to be mobilised for Innovation." },
  { obj: "To create at least one billion dollar technology startup that is home-grown." },
  { obj: "Foster Innovation Culture among the youth of the State." }
];

const Objectives = (props) => {
  return (
    <div className='flex gap-4 text-sm text-justify'>
      <svg className="w-6 h-6 ml-7 mt-1 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 12H5m14 0-4 4m4-4-4-4" />
      </svg>
      <li>{props.obj}</li>
    </div>
  );
}

const AndhraPradeshStartupPolicy = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation Menu */}
      <div className="w-[0px] lg:w-1/4 lg:bg-blue-200 p-4">
        <FloatingMenu />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:mx-10 mx-0 mr-6 mt-[70px] lg:mt-0 w-1/4 lg:w-full">
        {/* Image Section */}
        <div className='flex justify-center gap-6'>
          <img
            src={APstartuppolicy}
            alt="Andhra Pradesh Startup Policy"
            className="lg:w-[500px] w-[300px] h-60 rounded"
          />
        </div>

        {/* Description Section */}
        <div className="mt-8 space-y-4">
          <div className="rounded-background text-sm text-justify mx-5">
            <p className='indent'>
              The State of Andhra Pradesh requires world-class scientific and technologically advanced ecosystems that could empower and enable its youth to carry out the fundamental duties for the country...
            </p>

            <p className='text-lg mb-1 text-[#00327a] font-bold mt-3'>Vision of the Policy </p>
            <p className=''>The Vision of the Andhra Pradesh Innovation and Startup Policy is as follows:</p>
            <p className='lg:ml-10 mx-5  mt-1 lg:w-[700px]'>
              ”To create a world-class ‘technology startup ecosystem’ by fostering ‘entrepreneurship and a culture of innovation’ which contributes to increased knowledge, wealth, and employment in our society.“
            </p>

            <p className='text-lg mb-1 text-[#00327a] font-bold mt-3'>Mission </p>
            <p className='indent'>
              To provide avenues for the first generation entrepreneurs, researchers, students, citizens, and the government to learn, collaborate, disrupt and transform their innovative ideas into prototypes of viable products and services of social relevance.
            </p>
          </div>
        </div>

        {/* Targets Section */}
        <div className="mt-4 space-y-4 bg-[#3a9ace18] rounded-[10px] px-10 py-6">
          <div className="text-sm font-bold text-xl text-[#00327a] text-center lg:text-left">Targets of the Policy</div>
          <p className='indent text-justify'>
            Andhra Pradesh strives to achieve its collective dream of a new India where a new generation of software products would be manufactured...
          </p>

          <ul>
            {objs.map((item, index) => (
              <li key={index} className='mt-5'>
                <Objectives obj={item.obj} />
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Links */}
        <p className='text-lg my-4'>For more details visit the following link: </p>
        <a className='text-blue-700 ml-3 text-center lg:text-left' href='https://apis.ap.gov.in' target='_blank'>https://apis.ap.gov.in</a>
      </div>
    </div>
  );
};

export default AndhraPradeshStartupPolicy;
