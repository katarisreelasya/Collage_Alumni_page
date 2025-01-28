import React, { useState } from 'react';
import IT from '../../assets/Landing.png';
import gmrit from '../../assets/logo.jpg';
import { RiEyeCloseFill } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);

      try {
          const response = await axios.post('http://localhost:3000/api/alumni/login', {login_id: username, password }, { withCredentials: true });
          alert(response.data.message);
          navigate('/'); // Redirect to home on successful login
      } catch (error) {
          alert(error.response.data.message);
      } finally {
          setIsLoading(false);
      }
      window.location.reload();
  };
    
    

    const handlePasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <section className="flex items-center justify-center">
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 w-full">
                {/* Left side image */}
                <div className="relative hide-mobile  hidden items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:block">
                    <div className="absolute inset-0">
                        <img
                            className="h-[100vh] w-full rounded-br-full rounded-tr-full rounded object-cover"
                            src={IT}
                            alt=""
                        />
                    </div>
                </div>

                {/* Form section */}
                <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="w-full max-w-sm xl:max-w-md">
                        <div className="mb-4 text-center">
                            <img src={gmrit} height={130} width={130} alt="GMRIT Logo" />
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black sm:text-4xl">Alumni Login</h2>
                        <p className="mt-2 text-sm text-center text-gray-600">
                            Don&#x27;t have an account?{" "}
                            <a href="#" title="" className="font-semibold text-black hover:underline">
                                Contact Your Administrator
                            </a>
                        </p>
                        <form onSubmit={handleClick} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Email address </label>
                                    <div className="mt-2">
                                        <input
                                            className="w-full h-10 rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            type="text"
                                            placeholder="JNTUNO@gmrit.edu.in"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900"> Password </label>
                                        <a href="#" title="" className="text-sm font-semibold text-black hover:underline"> Forgot password? </a>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center border border-gray-400 rounded-md">
                                            <input
                                                className="h-10 w-full rounded-l-md bg-transparent px-3 py-2 text-sm placeholder:text-gray-400"
                                                type={isPasswordVisible ? "text" : "password"}
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div onClick={handlePasswordToggle} className="px-3 cursor-pointer">
                                                {isPasswordVisible ? <FaRegEye /> : <RiEyeCloseFill />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-full bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <defs>
                                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                                                        <stop offset="100%" style={{ stopColor: '#40ADFE', stopOpacity: 1 }} />
                                                    </linearGradient>
                                                </defs>
                                                <circle
                                                    className="opacity-100"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="url(#gradient)"
                                                    strokeWidth="4"
                                                ></circle>
                                            </svg>
                                        ) : (
                                            <>
                                                Login
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="ml-2"
                                                >
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
