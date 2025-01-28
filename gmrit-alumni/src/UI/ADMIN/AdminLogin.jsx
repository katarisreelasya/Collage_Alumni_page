import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import IT from '../../assets/Landing.png';
import gmrit from '../../assets/logo.jpg';
import { RiEyeCloseFill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";

const AdminLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [username, setUsername] = useState(''); // Added username state
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // For error handling
    const navigate = useNavigate(); // Initialize navigate

    const handlePasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsLoading(true);
        setError(null); // Reset error state before new login attempt

        try {
            const response = await fetch('http://localhost:3000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials:'include' 
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed'); // Handle error response
            }

            // Successful login
            alert('Login successful!'); // or redirect to another page
            console.log(data); // Optionally log the response

            navigate('/Admin'); // Redirect to /Admin after successful login
        } catch (err) {
            setError(err.message); // Set error message
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <section>
            <div className="h-[100vh] grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:block relative hide-mobile flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                    <div className="absolute inset-0">
                        <img
                            className="h-[100vh] w-full rounded-br-full rounded-tr-full rounded object-cover"
                            src={IT}
                            alt=""
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className='w-auto mb-2'><img src={gmrit} height={150} width={150} /></div>
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Admin Login
                        </h2>
                        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                        <form onSubmit={handleLogin} className="mt-8"> {/* Use handleLogin on form submission */}
                            <div className="space-y-5">
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)} // Update username state
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-900">
                                            Password
                                        </label>
                                        <a
                                            href="#"
                                            title=""
                                            className="text-sm font-semibold text-black hover:underline"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center border border-gray-400 rounded-md">
                                            <input
                                                className="h-10 w-full rounded-l-md bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 border-none"
                                                type={isPasswordVisible ? "text" : "password"}
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} // Update password state
                                            />
                                            <div onClick={handlePasswordToggle} className="flex items-center px-3 cursor-pointer">
                                                {isPasswordVisible ? <FaRegEye /> : <RiEyeCloseFill />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit" // Submit the form
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

export default AdminLogin;
