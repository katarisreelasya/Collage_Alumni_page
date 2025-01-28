import React from 'react'

const HoverImageWithText = (props) => {
  return (
    <div className="relative w-full h-[60vh]">
      <img
        src={props.img}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">
        <nav className="flex items-center space-x-2 text-gray-300 ml-8 sm:ml-0">
      <div className="hover:text-[#00327a]">Home</div>
      <span className='hover:text-[#00327a]'>{'>>'}</span>
      <div  className="hover:text-[#00327a]">{props.name}</div>
    </nav>
        </h1>
      </div>
    </div>
  );
};

export default HoverImageWithText;