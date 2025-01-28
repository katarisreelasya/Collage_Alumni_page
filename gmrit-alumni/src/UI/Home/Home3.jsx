import React from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

function Home3() {
  return (
    <div className="impact-background bg-orange-gradient container mx-auto p-4 text-white text-center">
      <h1 className="text-3xl font-bold mb-4 align-center mt-10" data-aos="fade-right" data-aos-duration="3000">
        YOUR IMPACT IN ACTION
      </h1>
      <p className="mb-4 text-xl" data-aos="fade-left" data-aos-duration="3000">
        Because of you, so much is possible
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 mx-10">
        <div data-aos="fade-up" data-aos-anchor-placement="top-center" data-aos-duration="1500">
          <Card className="bg-opacity-30 bg-white border-0 h-50 w-60 md:h-72 sm:h-40  md:w-72 sm:w-40 mx-auto">
            <div className='m-auto'>
              <div className='bg-blue'>
                <svg className="mx-auto h-20 w-20 md:h-24 md:w-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
              </div>
              <h5 className="text-lg md:text-xl font-bold tracking-tight text-white mb-2">BOARD MEMBERS</h5>
              <div className='pulse-button border border-2 rounded-full text-center py-1 md:py-2'>
                <Link to="/About/BoardMembers" className='flex items-center justify-center space-x-2' style={{ width: "80px", margin: "0 auto" }}>
                  <p className='text-white-100 text-sm md:text-base'>View</p>
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                  </svg>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div data-aos="fade-up" data-aos-anchor-placement="top-center" data-aos-duration="1000">
          <Card className="bg-opacity-30 bg-white border-0 h-50 w-60 md:h-72 sm:h-40 md:w-72 sm:w-40 mx-auto">
            <div className='m-auto'>
              <div className='bg-blue'>
                <svg className="mx-auto w-20 h-20 md:w-24 md:h-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z"/>
                </svg>
              </div>
              <h5 className="text-lg md:text-xl font-bold tracking-tight text-white mb-2">CONTRIBUTIONS</h5>
              <div className='pulse-button border border-2 rounded-full text-center py-1 md:py-2'>
                <Link to="/donation" className='flex items-center justify-center space-x-2' style={{ width: "120px", margin: "0 auto" }}>
                  <p className='text-white-100 text-sm md:text-base'>View</p>
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                  </svg>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div data-aos="fade-up" data-aos-anchor-placement="top-center" data-aos-duration="1000">
          <Card className="bg-opacity-30 bg-white border-0 h-50 w-60 md:h-72 sm:h-40 md:w-72 sm:w-40 mx-auto">
            <div className='m-auto'>
              <div className='bg-blue'>
                <svg className="mx-auto w-20 h-20 md:w-24 md:h-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clipRule="evenodd"/>
                </svg>
              </div>
              <h5 className="text-lg md:text-xl font-bold tracking-tight text-white mb-2">JOB PORTAL</h5>
              <div className='pulse-button border border-2 rounded-full text-center py-1 md:py-2'>
              <Link to="/career_alerts" className='flex items-center justify-center space-x-2' style={{ width: "150px", margin: "0 auto" }}>
                  <p className='text-white-100 text-sm md:text-base'>View</p>
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                  </svg>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home3;
