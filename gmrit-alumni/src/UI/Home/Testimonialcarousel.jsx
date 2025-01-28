import React from 'react';
import d_alumni1 from "../../assets/d_alumni1.jpeg";
import d_alumni2 from "../../assets/d_alumni2.jpg";
import Image4 from '../../assets/image4.png';
import Image5 from '../../assets/image5.jpg';
import Srinivas_img from '../../assets/kondapalli srinivas.jpg';

const TestimonialCarousel = () => {
  return (
    <div id="default-carousel" className="relative w-full sm:h-full h-[550px]" data-carousel="slide">
      <h1 className="sm:text-4xl text-3xl text-[#FF8343] font-bold text-center mb-4 mt-10">Honored Alumni</h1>
      <p className="text-center text-gray-600 sm:text-lg text-sm max-w-2xl w-2/3 mb-5 sm:mb-0 mx-auto">
        
Showcasing the remarkable achievements and contributions of our most distinguished graduates, who have excelled in their fields and made a lasting impact.
      </p>
      
      {/* Carousel wrapper */}
      <div className="relative sm:h-[300px] h-[400px] overflow-hidden">
        {/* Item 1 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl px-4 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="md:mb-0 md:mr-8">
                  <div className="flip-round relative rounded-full box-shadow-4" data-aos="flip-left" data-aos-duration="2000">
                    <img 
                      className="rounded-full w-40 h-40 mt-5 sm:mt-0 object-cover" 
                      src={d_alumni1} 
                      alt="Alumni img" 
                    />
                  </div>
                </div>
                <div className='text-black w-full sm:text-left text-center md:w-1/2' data-aos="fade-left" data-aos-duration="1000">
                  <p className="mb-4 w-2/3 sm:w-full mx-auto ">
"Honoring our esteemed IAS officer alumni, a beacon of dedication, excellence, and inspiring leadership."</p>
                  <h1 className='text-[#FF8343] font-bold sm:text-2xl text-xl'>Mr.K Sivakumar Naidu. I.A.S</h1> 
                  <h1 className='mt-2 sm:text-lg text-black text-sm font-bold'>Additional Commissioner, Municipal Corporation</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl px-4">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="flip-round relative rounded-full box-shadow-4" data-aos="flip-left" data-aos-duration="2000">
                    <img 
                      className="rounded-full w-40 h-40 mt-10 sm:mt-0 object-cover" 
                      src={d_alumni2} 
                      alt="Alumni img" 
                    />
                  </div>
                </div>
                <div className='text-black w-full sm:text-left text-center md:w-1/2' data-aos="fade-left" data-aos-duration="1000">
                <p className="mb-4 w-2/3 sm:w-full mx-auto ">"Honoring our distinguished alumnus, the Municipal Commissioner, for inspiring leadership and dedication."</p>
                <h1 className='text-[#FF8343] font-bold sm:text-2xl text-xl'>Mrs.B. Sandya</h1> 
                <h1 className='mt-2 sm:text-lg text-black text-sm font-bold mb-5'>Municipal Commissioner</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Item 3 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl px-4">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="flip-round relative rounded-full box-shadow-4" data-aos="flip-left" data-aos-duration="2000">
                    <img 
                      className="rounded-full w-40 h-40 mt-10 sm:mt-0  object-cover" 
                      src="http://115.241.205.4/alumni/img/img_dalumni_ParadesiNaidu.jpg"
                      alt="Alumni img" 
                    />
                  </div>
                </div>
                <div className='text-black w-full sm:text-left text-center md:w-1/2 h-[160px]' data-aos="fade-left" data-aos-duration="1000">
                <p className="mb-4 w-2/3 sm:w-full mx-auto ">"From our college halls to leading commercial taxation, <span className='font-bold'>Paradesi Naidu</span> exemplifies excellence in public finance."</p>
                <h1 className='text-[#FF8343] font-bold sm:text-2xl text-xl'>Mr.V.Paradesi Naidu</h1> 
                <h1 className='mt-2 sm:text-lg text-black text-sm font-bold mb-5'>Commercial Tax officer</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Item 4 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl px-4">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="flip-round relative rounded-full box-shadow-4" data-aos="flip-left" data-aos-duration="2000">
                    <img 
                      className="rounded-full w-40 h-40 mt-10 sm:mt-0  object-cover" 
                      src={Srinivas_img} 
                      alt="Alumni img" 
                    />
                  </div>
                </div>
                <div className='text-black w-full sm:text-left text-center md:w-1/2' data-aos="fade-left" data-aos-duration="1000">
                <p className="mb-4 w-2/3 sm:w-full mx-auto ">"From our college halls to serving as a state minister, <span className='font-bold'>Kondapalli Srinivas Rao</span> embodies dedication and leadership in public service."</p>
                <h1 className='text-[#FF8343] font-bold sm:text-2xl text-xl'>Mr. Kondapalli Srinivas Rao</h1> 
                <h1 className='mt-2 sm:text-lg text-black text-sm font-bold mb-5'>Minister and MLA of Gajapathinagaram</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
      </div>

      {/* Slider controls */}
      <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default TestimonialCarousel;