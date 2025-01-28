import React from 'react';
import Image2 from '../../assets/image2.jpg';
import Image3 from '../../assets/image3.jpg';
import "../../App.css";

const Home1 = () => {
  return (
    <div className="home1-padding relative flex flex-col gap-10 md:flex-row justify-center items-center bg-gray-100 p-4">
      <div className="flip-container">
        <div className="flipper rounded-full box-shadow-4">
          <div className="front">
            <img 
              className="rounded-full w-40 h-40 sm:w-40 sm:h-40" 
              src={Image2} 
              alt="Front Image" 
            />
          </div>
          <div className="back">
            <img 
              className="rounded-full w-40 h-40 sm:w-40 sm:h-40" 
              src={Image3} 
              alt="Back Image" 
            />
          </div>
        </div>
      </div>
      <div className="text-blue px-4 md:px-5 md:mt-10 w-full sm:h-[200px] sm:h-[200px] md:w-1/3 sm:text-left text-center" data-aos="fade-left" data-aos-duration="1000">
        <h1 className="font-bold text-lg md:text-2xl ">All Standard, All Together,</h1> 
        <h1 className="font-bold text-lg md:text-2xl">Empowering a Global Network</h1>
        <p className="text-sm md:text-base">Our alumni are leaders and innovators, connecting across industries to drive change and make impactful contributions worldwide.</p>
      </div>
    </div>
  );
}

export default Home1;
