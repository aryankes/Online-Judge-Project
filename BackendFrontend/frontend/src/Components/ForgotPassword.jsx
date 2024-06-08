import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';

function ForgotPassword()  {
const navigate = useNavigate();

const[formData,setData]=useState({
  email:"",
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post(`${API_BASE_URL}/api/example/forgotPassword`, formData);
      navigate(`/VerifyOTP/${formData.email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      alert(error.response.data);
      // navigate('/');
    }
  };
  const handleChange= (e)=>{
    // console.log(formData);
    const{name,value}=e.target;
    setData((prevData)=>({
        ...prevData,
        [name]: value
    }));
};
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Forgot Password</h2>
        <div className='mb-4'>
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="email">
                Email:
            </label>
                <input 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder='Enter your registerd email' />
        </div>
        <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Enter
            </button>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;