import React from 'react';
import EducationCarousel from './Carousel';
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Nav from '../Nav';
import CustomFooter from '../Footer';
import TestimonialCarousel from './Testimonialcarousel';
import SocialMediaCards from './SocialMediaCard';
import Gallery from './HomeGallery';
import BirthdaysCard from './BirthdaysCard';



const HomePage = () => {



  return (
    <div className="overflow-x-hidden w-full">

      <Nav />
      <EducationCarousel />
      <Home2 />
      <Home1 />
      <BirthdaysCard />
      <Home3 />
      <TestimonialCarousel />
      <Gallery/>
      <SocialMediaCards />
      <CustomFooter />
    </div>
  );
};

export default HomePage;
