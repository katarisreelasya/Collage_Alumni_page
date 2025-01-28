import React from 'react';
import FloatingMenu from './FloatingMenu';
import Overview from './Overview';


const Innovators = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation Menu */}
      <div className="w-[50px] lg:bg-blue-200 lg:w-1/4 p-4">
        {/* <ul className="space-y-2 text-sm text-gray-700 text-center"> */}
          <FloatingMenu/>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 sm:p-8 p-0 sm:mx-10 mx-0">
        <Overview/>
       
      </div>
    </div>
  );
};

export default Innovators;
