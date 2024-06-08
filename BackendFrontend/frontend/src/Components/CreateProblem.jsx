import React, {useState} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';

function CreateProblem(){
    const navigate = useNavigate();
    const[formData,setData]=useState({
        PID:"",
        ProblemName:"",
        ProblemDescription:"",
        ProblemLevel:"",
        TimeLimit:"",
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
        // if(formData.password!==formData.confirm_password){
        //     alert('Password not match with confirmPassword');
        //     return ;
        // }
        try{
            const response= await axios.post(`${API_BASE_URL}/api/problems/create`,formData);
            alert(`Success: ${response.data.message}`);
            // console.log(formData);
            navigate(`/ProblemDescription/${formData.PID}`);
        }
        catch(error){
            console.log("error in submitting while creating problem");
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                alert(`Error: ${error.response.data.message}`); // Include server error response in alert message

              } 
              else if (error.request) {
                console.error('Request data:', error.request);
              } 
              else {
                console.error('Error message:', error.message);
              }
            // console.log(error);
            // console.log(formData);
            // alert("An error occured. please try again.");
        }
    };

    return(
        <div className="min-h-screen  bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
            <Navbar/>
            {/* <div className=" h-auto bg-gray-100 dark:bg-gray-900"> */}
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create a New Problem</h2>
                <div>
                    <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor='PID'>
                        PID:
                    </label>
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        
                        type="text" name="PID" value={formData.PID} onChange={handleChange} required  />
                    
                </div>
                <br />
                <div>
                    <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor='ProblemName'>
                        Name:</label>
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        
                        type="text" name="ProblemName" value={formData.ProblemName} onChange={handleChange} required  />
                    
                </div>
                <br /><div>
                    <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor='ProblemDescription'>
                        Description:</label>
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        
                        type="text" name="ProblemDescription" value={formData.ProblemDescription} onChange={handleChange} required  />
                    
                </div>
                <br /><div>
                    <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor='TimeLimit'>
                        TimeLimit:</label>
                        <input 
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" name="TimeLimit" value={formData.TimeLimit} onChange={handleChange} required  />
                    
                </div>
                <br /><div>
                    <label >
                        <span className="block text-gray-700 mr-3 dark:text-gray-100 text-sm font-bold mb-2">Level: </span>
                        <label htmlFor="Easy" className=" text-gray-700 dark:text-gray-100  mr-1">Easy</label>
                        <input id="Easy" type="radio" name="ProblemLevel" value={"Easy"} onChange={handleChange} required className='mr-2 p-2' />
                        
                        <label htmlFor="Medium" className=" text-gray-700 dark:text-gray-100  mr-1">Medium</label>
                        <input id="Medium" type="radio" name="ProblemLevel" value={"Medium"} onChange={handleChange} required className='mr-2 p-2' />
                        
                        <label htmlFor="Hard" className=" text-gray-700 dark:text-gray-100  mr-1">Hard</label>
                        <input id="Hard" type="radio" name="ProblemLevel" value={"Hard"} onChange={handleChange} required className='mr-2 p-2' />
                    </label>
                </div>
                <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    type="submit"
                >
                    Create
                </button>
            </div>
            </form>
        </div>
        // </div>
            
        
    )

}
export default CreateProblem;