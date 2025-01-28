import React from 'react';
import { Card } from 'flowbite-react';
import { FaUser, FaBookReader, FaBook, FaScroll } from 'react-icons/fa';

const FeatureCards = () => {
  const features = [
    {
      title: 'Guest Lectures',
      icon: <FaUser className="h-8 w-8 text-white" />,
      desc: "Our alumni frequently conduct guest lectures, sharing their expertise and inspiring the next generation of students",
      bgColor: 'bg-[#233142]',
    },
    {
      title: 'Job Opportunities',
      icon: <FaBookReader className="h-8 w-8 text-white" />,
      desc: "We collaborate with our alumni network to provide valuable job opportunities for current students, helping them launch their careers successfully",
      bgColor: 'bg-[#455d7a]',
    },
    {
      title: 'Networking Opportunities',
      icon: <FaBook className="h-8 w-8 text-white" />,
      desc: "Connect with a diverse network of alumni, fostering collaborations and career advancements",
      bgColor: 'bg-[#233142]',
    },
    {
      title: 'Success Stories',
      icon: <FaScroll className="h-8 w-8 text-white" />,
      desc: "Celebrate the achievements of our alumni, who continue to make significant contributions in various fields",
      bgColor: 'bg-[#455d7a]',
    },
  ];
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-blue-100">
      {features.map((feature, index) => (
        <Card key={index} className={`${feature.bgColor} text-white rounded-none border-none`} style={{ height: 'auto', minHeight: '300px' }}>
          <div className="flex flex-col items-center text-center p-4" data-aos="fade-up">
            {feature.icon}
            <h5 className="text-xl md:text-2xl font-bold tracking-tight mt-4 mb-2">
              {feature.title}
            </h5>
            <p className="text-sm md:text-base font-normal">
              {feature.desc}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
