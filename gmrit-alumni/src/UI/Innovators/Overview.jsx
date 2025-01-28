import React from 'react'
import NarayanMurthyImage from '../../assets/narayanamurthy.jpeg';

const objs=[
    {
        obj:"To Act as an institutional mechanism to provide services to budding entrepreneurs."
    },
    {
        obj:"To create awareness, motivate and encourage the development of entrepreneurial skills and knowledge among the students."
    },
    {
        obj:"To Conduct training programmes in the field of entrepreneurial skill development."
    },
    {
        obj:"To identify the vast entrepreneurial resources that exists in the local environment that can be utilized for sustainable development."
    },
    {
        obj:"To respond effectively to the emerging challenges and opportunities both at national and international level relating to enterprises."
    },
    {
        obj:"To incubate the business ideas related to the Product and Process development by providing basic infrastructure needed through the various government funded schemes."
    }
];
const Objectives=(props)=>{
    return(
      <div className='flex gap-4 text-sm text-justify'>
          <svg class="w-6 h-6 ml-7 mt-1 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 12H5m14 0-4 4m4-4-4-4"/>
          </svg>
          <li>{props.obj}</li>
      </div>
    )
  }

const Overview = () => {
  return (
    <div>
        <div className=''>
        <div className='lg:flex justify-center mt-[70px] lg:mt-0 gap-6 mr-10 lg:mr-0'>
          <img
            src="http://115.241.205.4/alumni/img/alumni_meet7_1.jpg"
            alt="National Innovation and Startup Policy"
            className="w-[330px] h-50 rounded"
          />
          <img
            src={NarayanMurthyImage}
            alt="National Innovation and Startup Policy"
            className="w-[330px] h-50 rounded mt-4 lg:mt-0"
          />
          </div>
          <div className='lg:flex justify-center gap-5 mt-5'>
            <p className='text-red-600 mt-2 ml-4'>Read more about how GMRIT helps its students find suitable jobs.</p>
            <button type="button" class="custom-button1 text-white text-center bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 lg:mt-0 mt-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <a href='https://www.gmrit.org/' target='_blank'>Read More</a>
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
        </div>
       
        {/* Related Links */}
        <div className="mt-8 space-y-4 mr-10 lg:mr-0">
          
          <div className="text-sm text-justify ">
            <p className='rounded-background'>	
            <div className="text-sm font-bold text-xl text-[#00327a] mb-3 text-center lg:text-left">Overview</div>
        <p className='indent'>
        Believing that building Entrepreneurs is a key performance indicator attributing the nation’s growth,   GMRIT has established EDC (Entrepreneurship Development Cell) in the year 2006 with the financial support from AICTE. With a vision to promote entrepreneurship among the students and produce the Job givers rather than job seekers, the cell undertakes up several activities for student to inspire and motivate towards developing the spirit of entrepreneurship.

        The institute provides infrastructure and technical support to the students having innovative ideas to transform into new products and services for the betterment of the society. The EDC also assists all the aspirants with mentoring, planning and execution of their start up idea into a real business. The objective of entrepreneurial development in the institute is to motivate a person for entrepreneurial career and to make him capable of perceiving and exploiting successfully opportunities for enterprises.
        </p>
        <br/><p className='indent'>Entrepreneurship Development Programmes (EDP) are regularly conducted to nurture the entrepreneurial abilities and skills among the students. The EDC maintains a pool of Sponsors like banks, national entrepreneurship training agencies and franchisers, who are willing to support and guide the budding entrepreneurs. Regular training programs like workshops, guest lectures and seminars by eminent people from the industry, academia and Entrepreneurship organizations are conducted to encourage the students to consider self-employment as a career option apart from the Entrepreneurship skills courses within the curriculum.</p>
        </p>
          </div>
          
        </div>
        <div className="mt-4 space-y-4 bg-[#3a9ace18] rounded-[10px] lg:px-10 pr-5 py-6 mr-10 lg:mr-0 text-center sm:text-left">
          <div className="text-sm font-bold text-xl text-[#00327a]">Objectives</div>
          <ul>
          {
          objs.map((item,index)=>(
            <li key={index} className='mt-5'>
              <Objectives obj={item.obj} />
            </li>
          ))
          }
        </ul>
        </div>
       
    </div>
  )
}

export default Overview