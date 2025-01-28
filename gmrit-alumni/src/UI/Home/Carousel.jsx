import React from 'react';
import ivgmrit from '../../assets/ivgmrit.jpg';

export default function GradientImage() {
  return (
    <div className="relative ">
      {/* Responsive image that covers the screen */}
      <img
        src={ivgmrit}
        alt="Example"
        className="w-full lg:h-full h-[50vh] object-cover" 
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

      {/* Text content */}
      <div className="absolute inset-0 flex items-end justify-start sm:ml-4 sm:mb-4 ml-8 mb-10 text-white">
        <div className="max-w-md px-4   text-sm sm:px-0">
          {/* Main heading */}
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-snug sm:leading-tight">
            {/* Education Needs Complete Solution */}
            We Keep Your Memories Alive...
          </div>

          {/* Subtext */}
          <div className="mt-3 text-xs sm:text-sm md:text-base lg:text-lg">
            "Welcome to <span className="text-blue-600 font-bold">G</span>
            <span className="text-yellow-500 font-bold">M</span>
            <span className="text-red-600 font-bold">R</span>
            <span className="text-orange-600 font-bold">I</span>
            <span className="text-green-600 font-bold">T</span>, where academic excellence meets vibrant campus life,
            <br />prepared you for a successful future."
          </div>
        </div>
      </div>
    </div>
  );
}
