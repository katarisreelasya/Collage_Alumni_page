import React from 'react';
import FloatingMenu from './FloatingMenu';
import NISP from '../../assets/nisp.jpg';

const objs=[
    {
        obj:"HEIs Strategies & Governance for Promoting Innovation & Entrepreneurship"
    },
    {
        obj:"Creating Innovation Pipeline and Pathways for Entrepreneurs"
    },
    {
        obj:"Building Organizational Capacity, Human Resources and Incentives to support and promote innovative and entrepreneurial activities"
    },
    {
        obj:"Collaboration, Co creation, Business Relationship and Knowledge Exchange within campus and among the ecosystem enablers co-exist at regional and national level "
    },
    {
        obj:"Norms for Faculty & Students Driven Innovations and Startups"
    },
    {
        obj:"Incentivizing Students for Entrepreneurship and Startup pursuits"
    },
    {
        obj:"Incentivizing faculty and Staff for Entrepreneurship and Startup pursuits"
    },
    {
        obj:"Incubation & Pre incubation support and facility creation in HEIs"
    },
    {
        obj:"IP ownership rights for technologies Development and transfer in HEIs"
    },
    {
        obj:"Pedagogy and Learning Interventions for Innovation and Entrepreneurship Development "
    },
    {
        obj:"Incentivizing Students for Entrepreneurship and Startup pursuits"
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


const NispStartupPolicy = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation Menu */}
      <div className="w-[0px] lg:bg-blue-200 lg:w-1/4 p-4">
        {/* <ul className="space-y-2 text-sm text-gray-700 text-center"> */}
          <FloatingMenu/>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:mx-10 mx-0 mr-6 mt-[70px] lg:mt-0">
        
        <div className='flex justify-center gap-6'>
         
          <img
            src={NISP}
            alt="National Innovation and Startup Policy"
            className="w-[500px] h-50 rounded"
          />
          </div>
       
        {/* Related Links */}
        <div className="mt-8 space-y-4">
          <div className="rounded-background text-sm text-justify mx-5">
            
        <p className='indent '>
        The ‘National Innovation and Start up Policy 2019 for students and faculty in HEIs was launched by Former Minister of Education, Shri Ramesh Pokhriyal ‘Nishank’ on 11th September 2019 at AICTE, New Delhi.
        </p>
        <br/><p className='indent'>This policy intends to guide HEIs for promoting students’ driven innovations & start-ups and to engage the students and faculty in innovation and start up activities in campus. The policy aims at enabling HEIs to build, streamline and strengthen the innovation and entrepreneurial ecosystem in campus and will be instrumental in leveraging the potential of student’s creative problem solving and entrepreneurial mind-set, and promoting a strong intra and interinstitutional partnerships with ecosystem enablers and different stakeholders at regional, national and international level. The policy is being implemented by MoE’s Innovation Cell and in coordination AICTE, UGC, state/ UT governments and universities. Implementation of policy has been undertaken for quick adoption by HEIs. The present policy is a way forward to the earlier version of AICTE’s Start up Policy which was launched in the year 2016 to complement the Startup Action Plan under the Startup India and Stand up India Program launched by Hon’ble Prime Minster of India.</p>
          </div>
          
        </div>
        <div className="mt-4 space-y-4 bg-[#3a9ace18] rounded-[10px] px-10 py-6">
          <div className="text-sm font-bold text-xl text-[#00327a] text-center lg:text-left">Components of Guiding Framework</div>
          <p className='indent text-justify'>The National Innovation and Startup Policy laid down guiding framework for HEIs and it highlights various important and practical aspects of promoting and supporting innovation, technology commercialization and startups in academic setup as mentioned below:</p>
    
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
        <p className='text-lg my-4'>For more details visit the following link : </p>
        <a className='text-blue-700 ml-3 text-center lg:text-left' href='https://nisp.mic.gov.in' target='_blank'>https://nisp.mic.gov.in</a>
      </div>
      </div>
  );
};

export default NispStartupPolicy;