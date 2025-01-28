import React from 'react';
import { Footer, Button } from 'flowbite-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter ,FaYoutube} from 'react-icons/fa';
import Image1 from '../assets/image1.jpg';
import '../App.css';

const CustomFooter = () => {
  return (
    <Footer container className="bg-gray-900 text-white px-6 sm:px-10">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row justify-between align-center mx-4 sm:mx-12">
          <div className="mb-6 lg:mb-0">
            <Footer.Title className="text-2xl font-bold text-white" />
          </div>
          <div className="text-blue-300 text-xl font-bold text-center lg:hidden mb-5">
              USEFUL LINKS
          </div>
          <div className="grid grid-cols-2 sm:mt-4 sm:grid-cols-3 gap-0 lg:grid-cols-3 mx-auto">
          

            <div className=''>
              <Footer.Title title="USEFUL LINKS" className="hidden lg:block text-blue-300 text-xl text-center lg:text-left" />
              <Footer.LinkGroup col>
                <Footer.Link href="/" className="text-gray-400 hover:text-blue-300">Home</Footer.Link>
                <Footer.Link href="About/" className="text-gray-400 hover:text-blue-300">About</Footer.Link>
                <Footer.Link href="About/BoardMembers" className="text-gray-400 hover:text-blue-300">Board members</Footer.Link>
                <Footer.Link href="/stu_directory" className="text-gray-400 hover:text-blue-300">Student Directory</Footer.Link>
                <Footer.Link href="/Placement_directory" className="text-gray-400 hover:text-blue-300">Placement Directory</Footer.Link>
                <Footer.Link href="#" className="text-gray-400 hover:text-blue-300">Network Hub</Footer.Link>
                <Footer.Link href="#" className="text-gray-400 hover:text-blue-300">Alumni Network</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div className='lg:mt-6 mt-0'>
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-gray-400 hover:text-blue-300">Community Chat</Footer.Link>
                <Footer.Link href="/career_alerts" className="text-gray-400 hover:text-blue-300">Career Alerts</Footer.Link>
                <Footer.Link href="/innovators" className="text-gray-400 hover:text-blue-300">Innovators</Footer.Link>
                <Footer.Link href="/updates_gatherings" className="text-gray-400 hover:text-blue-300">Updates & Gatherings</Footer.Link>
                <Footer.Link href="#" className="text-gray-400 hover:text-blue-300">Join Us</Footer.Link>
                <Footer.Link href="/Registration" className="text-gray-400 hover:text-blue-300">Get in Touch</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div className='mt-6 lg:mt-0 text-center sm:text-left lg:ml-0 mx-auto ml-[20vw] lg:mr-14'>
              <div title="" className="text-white sm:mt-8 mb-3">ADDRESS-INFO </div>
              <Footer.LinkGroup row className='sm:gap-1'>
                <p className="text-gray-400 text-lg lg:text-sm sm:text-left text-center"> GMR Nagar Rajam,</p>
                <p className="text-gray-400 text-lg lg:text-sm sm:text-left text-center">Vizianagaram, AP, 532127</p>
                <p className="text-gray-400 text-lg lg:text-sm sm:text-left text-center">Email: gmrit@gmrit.edu.in, </p>
                <p className="text-gray-400 text-lg lg:text-sm sm:text-left text-center sm:ml-10 ml-0">alumni@gmrit.edu.in</p>
              </Footer.LinkGroup>
            </div>
          </div>

          <div className='mt-8 lg:mt-10 text-center'>
            <a href='https://gmrit.edu.in' target='_blank' className='text-blue-400 font-bold text-xl '>
              Visit GMRIT
            </a>
            <img 
              src={Image1} 
              alt="GMR Institute of Technology Map" 
              className="h-32 w-32 sm:h-35 sm:w-40 mb-6 rounded-full mt-4 ml-[90px] lg:ml-0"
            />
            <div className="flex space-x-4 justify-center mt-4 lg:mt-0">
              <Footer.Icon href="#" target='_blank' icon={FaFacebookF} />
              <Footer.Icon href="https://www.instagram.com/gmrit_rajam/" target='_blank' icon={FaInstagram} />
              <Footer.Icon href="https://www.linkedin.com/school/gmrit-rajam/posts/?feedView=all" target='_blank' icon={FaLinkedinIn} />
              <Footer.Icon href="#" target='_blank' icon={FaTwitter} />
              <Footer.Icon href="https://www.youtube.com/results?search_query=gmrit+" target='_blank' icon={FaYoutube} />
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default CustomFooter;
