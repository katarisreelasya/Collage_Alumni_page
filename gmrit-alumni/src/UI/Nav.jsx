import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logosq from '../assets/logosquare.jpg';
import Dropdown from '../UI/Home/Dropdown';
import Cookies from 'js-cookie';
import { useUser } from '../store/userStore';
import profile from '../assets/profile.png';
// import whatsapp from '../assets/icons/whatsapp.png';
// import degree from '../assets/icons/360-degree.png';


const Nav = () => {
  const location = useLocation();
  const [openDropdownId, setOpenDropdownId] = useState(null); // Desktop dropdown state
  const [openMobileDropdownId, setOpenMobileDropdownId] = useState(null); // Mobile dropdown state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();
  const {user} = useUser();

  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    // Check if authToken exists in cookies
    const token = Cookies.get("authToken");
    setAuthToken(token)
    console.log(token);
    ; // set state if token exists
  }, [authToken]);
  const dd1 = [
    {
      id: 1,
      mainheading: "ABOUT",
      subheadings: ["VISION", "BOARD MEMBERS","HONOURED ALUMNI"],
      links: ["/About", "/About/BoardMembers","/honoured_alumni",]
    },
    {
      id: 2,
      mainheading: "DIRECTORY",
      subheadings: ["ALUMNI DIRECTORY", "PLACEMENT DIRECTORY"],
      links: ["/stu_directory", "/Placement_directory"]
    }
  ];

  // , "ALUMNI NETWORK", "COMMUNITY CHAT"   , "/alumni_net", "/community_chat"
  const dd2 = [
    {
      id: 3,
      mainheading: "NETWORK",
      subheadings: ["NETWORK HUB","ENTREPRENEURS","FORUM"],
      links: ["/Network/Network_Hub", "/innovators","/forum"],
    },
    {
      id: 4,
      mainheading: "CAREER",
      subheadings: ["CAREER ALERTS"],
      links: ["/career_alerts"]
    },
    {
      id: 5,
      mainheading: "EVENTS",
      subheadings: [ "NEWS AND EVENTS" , "LATEST NEWS"],
      links: ["/updates_gatherings", "/latest_news"]
    },
    
  ];

  const handleDropdownToggle = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleMobileDropdownToggle = (id) => {
    setOpenMobileDropdownId(openMobileDropdownId === id ? null : id);
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Top Navbar */}
      <nav className="bg-[#5584C6] border-gray-200">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl px-2">
          <div className="flex items-center space-x-3">
            <a href='https://gmrit.edu.in' target='_blank' rel="noopener noreferrer" >
            <img src={logosq} className="rounded-sm h-[55px] w-[55px] py-2" alt="GMRIT Alumni Association Logo" />
            </a>
            <span className="self-center text-2xl text-white font-bold ml-5">GMRIT Alumni Association</span>
          </div>
          {/* Hamburger menu for mobile */}
          <button className="md:hidden text-white" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          
          
          {/* <div >
            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
              <img src={whatsapp} alt="WhatsApp" className="w-12 h-12" />
            </a>
          </div>
          <div >
            <a href="https://www.google.com/maps/@18.4664991,83.6608374,3a,90y,269.47h,90.74t/data=!3m8!1e1!3m6!1sAF1QipOVDYsRG0WR_Iy-36jXyPJO9DB_4k_AmdfiudFk!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOVDYsRG0WR_Iy-36jXyPJO9DB_4k_AmdfiudFk%3Dw203-h100-k-no-pi-0-ya19.899998-ro-0-fo100!7i13000!8i6500?coh=205409&entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
              <img src={degree} alt="360_degrees" className="w-12 h-12" />
            </a>
          </div> */}
          <div className='flex '>
          {/* Search and Login */}
          <div className="hidden md:flex items-center space-x-4 text-white">
          <div>
      {user ? (
        <div className='relative right-0 flex justify-center items-center gap-2'>
        <p className='font-semibold'>{user.name_of_the_alumni}
        </p> 
         <Link to={'/user/profile'}><img src={profile} alt="" width={40} height={40} /></Link>
         </div>
      ) : (
<>
<div className='flex gap-6'>
<button
  className="bg-white hover:bg-gray-200 text-blue-500 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
>
 <Link to={"/login"}> Login</Link>
</button>



</div>
</>
      )}
    </div>
          </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar for Desktop */}
      <nav className={`sm:bg-[#00327a] bg-[#5584C6] md:flex md:items-center ${isDrawerOpen ? 'block' : 'hidden'} md:block`}>
        <div className="max-w-screen-xl px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center py-1">
            <ul className="flex flex-col md:flex-row font-medium mt-0 md:space-x-8 text-sm">
              <li className="mt-2.5">
                <Link to="/" className={`text-white hover:text-yellow-500 ${location.pathname === '/' ? 'text-yellow-500 font-semibold' : ''}`}>
                  HOME
                </Link>
              </li>
              {dd1.map((item) => (
                <li key={item.id} className="relative">
                  <Dropdown
                    mainheading={item.mainheading}
                    subheadings={item.subheadings}
                    links={item.links}
                    isOpen={openDropdownId === item.id}
                    toggleDropdown={() => handleDropdownToggle(item.id)}
                  />
                </li>
              ))}
              {dd2.map((item) => (
                <li key={item.id} className="relative">
                  <Dropdown
                    mainheading={item.mainheading}
                    subheadings={item.subheadings}
                    links={item.links}
                    isOpen={openDropdownId === item.id}
                    toggleDropdown={() => handleDropdownToggle(item.id)}
                  />
                </li>
              ))}
              <div className='flex gap-5'>
              <li className="my-auto">
                  <Link to="/gallery" className={`text-white hover:text-yellow-500 ${location.pathname === '/gallery' ? 'text-yellow-500 font-semibold' : ''}`}>
                    GALLERY
                  </Link>
                </li>
                <li className="my-auto">
                  <Link to="/contributions" className={`text-white hover:text-yellow-500 ${location.pathname === '/contributions' ? 'text-yellow-500 font-semibold' : ''}`}>
                    CONTRIBUTIONS
                  </Link>
                </li>
                <li className="my-auto">
                  <Link to="/Registration" className={`text-white hover:text-yellow-500 ${location.pathname === '/Registration' ? 'text-yellow-500 font-semibold' : ''}`}>
                    GET IN TOUCH
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* Drawer for Mobile */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-[#00327a] text-white transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-40`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={() => setIsDrawerOpen(false)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          <li>
            <Link to="/" className={`text-white hover:text-yellow-500 ${location.pathname === '/' ? 'text-yellow-500 font-semibold' : ''}`} onClick={() => setIsDrawerOpen(false)}>HOME</Link>
          </li>
          {dd1.map((item) => (
            <li key={item.id}>
              <Dropdown
                mainheading={item.mainheading}
                subheadings={item.subheadings}
                links={item.links}
                isOpen={openMobileDropdownId === item.id}
                toggleDropdown={() => handleMobileDropdownToggle(item.id)}
              />
            </li>
          ))}
          {dd2.map((item) => (
            <li key={item.id}>
              <Dropdown
                mainheading={item.mainheading}
                subheadings={item.subheadings}
                links={item.links}
                isOpen={openMobileDropdownId === item.id}
                toggleDropdown={() => handleMobileDropdownToggle(item.id)}
              />
            </li>
          ))}
          <li>
            <Link to="/gallery" className={`text-white hover:text-yellow-500 ${location.pathname === '/gallery' ? 'text-yellow-500 font-semibold' : ''}`} onClick={() => setIsDrawerOpen(false)}>GALLERY</Link>
          </li>
          <li>
            <Link to="/contributions" className={`text-white hover:text-yellow-500 ${location.pathname === '/contributions' ? 'text-yellow-500 font-semibold' : ''}`} onClick={() => setIsDrawerOpen(false)}>CONTRIBUTIONS</Link>
          </li>
          <li>
            <Link to="/Registration" className={`text-white hover:text-yellow-500 ${location.pathname === '/Registration' ? 'text-yellow-500 font-semibold' : ''}`} onClick={() => setIsDrawerOpen(false)}>GET IN TOUCH</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
