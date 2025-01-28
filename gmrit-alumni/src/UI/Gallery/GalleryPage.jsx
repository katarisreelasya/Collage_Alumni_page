import React from 'react';
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import photos from './001/photos';
import Nav from '../Nav';

const GalleryPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Nav />
      <div className="bg-gradient-to-b from-gray-100 to-white">
        {/* Header with gradient and animation */}
        <div className="sticky top-0 w-full py-4 bg-gradient-to-r from-blue-500 to-green-400 z-10 shadow-lg">
          <marquee className="text-white text-3xl font-extrabold">
            Photo Gallery
          </marquee>
        </div>

        {/* Year Selection Buttons */}
        <div className="flex justify-center items-center space-x-6 py-6 text-gray-800 font-semibold text-xl">
          <button className="hover:text-blue-500 transition duration-300 transform hover:scale-110">2021</button>
          <svg
            className="w-8 h-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 10l3-3m0 0l-3-3m3 3H5v3m3 4l-3 3m0 0l3 3m-3-3h14v-3"
            />
          </svg>
          <button className="hover:text-green-500 transition duration-300 transform hover:scale-110">2023</button>
        </div>

        {/* Photo Album with animation */}
        <div className="px-4 sm:px-8 lg:px-16 py-8">
          <div className="animate-fadeIn">
            <RowsPhotoAlbum
              photos={photos}
              layout="rows"
              spacing={12}
              targetRowHeight={250}
              renderPhoto={({ imageProps }) => (
                <div className="transform hover:scale-105 transition duration-300">
                  <img {...imageProps} className="rounded-lg shadow-md" />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
