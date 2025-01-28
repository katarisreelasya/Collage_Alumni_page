import React from 'react';
import GalleryBgImg from '../../assets/Gallery/Gal-img.png'
import { Link } from 'react-router-dom';


const HomeGallery = () => {
  return (
    <div className='bg-[#124076] my-10 pt-14'>
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main background image with overlay, aligned to the right */}
      <div className="absolute inset-y-0 right-0  w-[350px] h-[600px] lg:w-[1000px] m-5 sm:mr-10 lg:w-[60%] overflow-hidden">
        <img 
          src={GalleryBgImg}
          alt="Graduates" 
          className=" object-cover h-[400px] lg:h-[500px]"
        />
        {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
      </div>

      

      {/* Text overlay */}
      <div className="absolute sm:top-1/4 top-1/2 left-8 sm:w-1/3 sm:h-[250px] ml-12 w-2/3 text-center bg-gray-100 mx-auto p-6 pb-10 shadow-lg">
        {/* <div className="text-sm text-gray-500 mb-2"></div> */}
        <h1 className="text-3xl sm:text-4xl font-bold my-4 text-[#00327a] ">Explore our gallery</h1>
        <p className=" text-sm sm:text-xl ">
        A vibrant showcase of memorable moments and achievements from our alumni community.

        </p>
        <div className="mt-4 flex justify-end items-center">
          <Link to='/gallery'><button className="text-base text-blue-900 sm:text-lg">See more...</button></Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomeGallery;