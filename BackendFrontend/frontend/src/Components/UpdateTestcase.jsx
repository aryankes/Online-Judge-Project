import React, {useState,useEffect} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { API_BASE_URL } from './config';

function UpdateTestcase(){
    const {id1:PID,id:_id}=useParams();
    
    const navigate = useNavigate();
    const[formData,setData]=useState({
        PID:PID,
        TestcaseName:"",
        Input:"",
        Solution:"",
    });
    useEffect(() => {
        async function fetchTests() {
          try {
            const response = await axios.get(`${API_BASE_URL}/api/tests/read/${_id}`);
            setData(response.data);
          } 
          catch (error) {
            console.error('Error fetchingTests: for update', error);
          }
        }
    
        fetchTests();
    }, []);
    const handleChange= (e)=>{
        // console.log(formData);
        const{name,value}=e.target;
        setData((prevData)=>({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        
        try{
            // console.log(formData);

            const response= await axios.put(`${API_BASE_URL}/api/tests/update/${_id}`,formData);
            alert(`Success: ${response.data.message}`);
            // navigate('/homepage');
            navigate(`/TestcaseDescription/${formData._id}`);

        }
        catch(error){
            console.log("error in submitting while updation of testcase");
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

    
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Navbar />
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Update Testcase</h2>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="TestcaseName">
                    Test Name:
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="TestcaseName"
                    type="text"
                    name="TestcaseName"
                    value={formData.TestcaseName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="Input">
                    Input:
                </label>
                <textarea
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Input"
                    
                    name="Input"
                    value={formData.Input}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="Solution">
                    Solution:
                </label>
                <textarea
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Solution"
                    name="Solution"
                    value={formData.Solution}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Update
                </button>
            </div>
        </form>
    </div>
    );
}
export default UpdateTestcase;