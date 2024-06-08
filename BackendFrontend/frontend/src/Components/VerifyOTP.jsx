import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function VerifyOTP()  {
    const navigate = useNavigate();
    const [OTP, setOTP] = useState({
      otp:"",
    });
    const {id:Email}=useParams();
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/example/verifyOTP', { email:Email,otp:OTP.otp });
      navigate(`/ChangePassword/${OTP.otp}/${Email}`)

    } catch (error) {
      console.error('OTP do not match:', error);
        alert("OTP do not match");
        // navigate('/');
    }
  };
  const handleChange= (e)=>{
    // console.log(formData);
    const{name,value}=e.target;
    setOTP((prevData)=>({
        ...prevData,
        [name]: value
    }));
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
    
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Forgot Password</h2>
        {/* <input
          type="OTP"
          placeholder="Enter your OTP"
          value={OTP}
          onChange={(e) => setOTP(e.target.value)}
          required
        /> */}
        <div className='mb-4'>
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="otp">
                OTP:
            </label>
                <input 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" id="otp" name="otp" value={OTP.otp} onChange={handleChange} required placeholder='Enter OTP' />
        </div>
        <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
              Send OTP
            </button>
          </div>
      </form>
    </div>
  );
};
export default VerifyOTP;