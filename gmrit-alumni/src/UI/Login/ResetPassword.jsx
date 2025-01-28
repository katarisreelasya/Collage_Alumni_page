import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useUser } from '../../store/userStore';

export default function ResetPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [isPasswordVisible3, setIsPasswordVisible3] = useState(false);

  const { user } = useUser();
  console.log(user);

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length > 6 && password.length <= 10;

    return hasUppercase && hasNumber && hasSpecialChar && isValidLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage('');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be 7-10 characters long, contain an uppercase letter, a number, and a special character.');
      setMessage('');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user?.login_id,
          old_password: oldPassword,
          new_password: password,
        }),
        credentials: 'include'
      });
      console.log(user?.login_id);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password');
      }

      const data = await response.json();
      setError('');
      setMessage(data.message);
      alert('Password updated successfully...');
    } catch (error) {
      console.error('Error resetting password:', error);
      setError(error.message || 'Failed to reset password');
      setMessage('');
    }
  };
  const handlePasswordToggle1 = () => {
    setIsPasswordVisible1((prev) => !prev);
  };

  const handlePasswordToggle2 = () => {
    setIsPasswordVisible2((prev) => !prev);
  };

  const handlePasswordToggle3 = () => {
    setIsPasswordVisible3((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg px-8 py-6 relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Old Password</label>
            <input
              type={isPasswordVisible3 ? 'text' : 'password'}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <div onClick={handlePasswordToggle3} className="absolute right-3 top-9 cursor-pointer">
              {isPasswordVisible3 ? <FaRegEye /> : <RiEyeCloseFill />}
            </div>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700">New Password</label>
            <input
              type={isPasswordVisible1 ? 'text' : 'password'}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div onClick={handlePasswordToggle1} className="absolute right-3 top-9 cursor-pointer">
              {isPasswordVisible1 ? <FaRegEye /> : <RiEyeCloseFill />}
            </div>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type={isPasswordVisible2 ? 'text' : 'password'}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div onClick={handlePasswordToggle2} className="absolute right-3 top-9 cursor-pointer">
              {isPasswordVisible2 ? <FaRegEye /> : <RiEyeCloseFill />}
            </div>
          </div>

          <div className="flex gap-5">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Reset Password
            </button>

            <Link to="/user/profile" className="w-full bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
