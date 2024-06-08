import React, {useState} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

import { useNavigate ,Link} from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    const[formData,setData]=useState({
        firstName:"",
        lastName:"",
        userhandle:"",
        email:"",
        password:"",
        confirmPassword:"",
        role:"",
    });

    const handleChange= (e)=>{
        const{name,value}=e.target;
        setData((prevData)=>({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(formData.password!==formData.confirmPassword){
            alert("Confirmation mismatch");
            return ;
        }
        e.preventDefault();
        try{
            const response= await axios.post('http://localhost:5000/api/example/register',formData);
            alert(`Success: ${response.data.message}`);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userhandle', response.data.userhandle);
            navigate('/homepage');
        }
        catch(error){
            console.log("error in submitting while registering");
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                alert(`Error: ${error.response.data}`); // Include server error response in alert message
              } 
              else if (error.request) {
                console.error('Request data:', error.request);
              } 
              else {
                console.error('Error message:', error.message);
              }
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-200 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4">
            <form className="mt-0 space-y-2"onSubmit={handleSubmit}>
            <h1 className="text-center text-3xl font-extrabold text-blue-900">Aryan Online Judge</h1>

                <h2 className="text-center text-2xl font-extrabold text-gray-900">Register</h2>
                <div>
                    <label className="block text-gray-700">Firstname:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md"  />
                    
                </div>

                <div>
                    <label className="block text-gray-700">Lastname:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md"  />
                    
                </div>
                <div>
                    <label className="block text-gray-700">Userhandle:</label>
                        <input type="text" name="userhandle" value={formData.userhandle} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md"  />
                    
                </div>
                <div>
                    <label className="block text-gray-700">Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md"  />
                    
                </div>
                
                <div>
                    <label className="block text-gray-700">Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md"  />
                    
                </div>
                <div>
                    <label className="block text-gray-700">Confirm Password:</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md"  />
                </div>
                <br />
                
                <div>
                    <span className=" text-gray-700 mr-3">Role: </span>
                    <label htmlFor="user" className=" text-gray-700 mr-1">User</label>
                    <input id="user" type="radio" name="role" value={"user"} onChange={handleChange} required className='mr-2 p-2' />

                    <label htmlFor="admin" className=" text-gray-700 mr-1">Admin</label>
                    <input id="admin" type="radio" name="role" value={"admin"} onChange={handleChange} required className='mr-2 p-2' />
                </div>
                <br />
                <div className="flex items-center justify-between">
                <button type="submit" className="mt-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Register </button>
                </div>
                <br />
            </form>
            <div className="text-center text-red-500">Account already exists. <Link to="/Login" className="text-blue-600">Login</Link></div>
        </div>
        </div>
    )

}
export default Register;