import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';

import { useNavigate } from 'react-router-dom';

function CreateTestcase(){
    const {id:PID}=useParams();
    // console.log("PID is ",PID);
    const navigate = useNavigate();
    const[formData,setData]=useState({
        TestcaseName:"",
        PID:PID,
        Input:"",
        Solution:"",
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
        try{
            const response= await axios.post('http://localhost:5000/api/tests/create',formData);
            alert(`Success: ${response.data.message}`);
            // console.log(formData);
            navigate(`/TestcaseDescription/${response.data.testcase._id}`);
        }
        catch(error){
            console.log("error in submitting while creating testcase");
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
//     return(
//         <div>
//             <Navbar/>
//             <form onSubmit={handleSubmit}>
//                 <h2>Create a New Test</h2>
//                 {/* {console.log(formData)} */}
//                 <div>
//                     <label >
//                         Test Name:
//                         <input type="text" name="TestcaseName" value={formData.TestcaseName} onChange={handleChange} required  />
//                     </label>
//                 </div>
//                 <br /><div>
//                     <label >
//                         Input:
//                         <input type="text" name="Input" value={formData.Input} onChange={handleChange} required  />
//                     </label>
//                 </div>
//                 <br /><div>
//                     <label >
//                         Solution:
//                         <input type="text" name="Solution" value={formData.Solution} onChange={handleChange} required  />
//                     </label>
//                 </div>
//                 <br />
//                 <button type="submit"> Create </button>
//                 <br />
//             </form>
//         </div>
            
        
//     )

// }
return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Navbar />
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create a New Test</h2>
            
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
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Input"
                    type="text"
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
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Solution"
                    type="text"
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
                    Create
                </button>
            </div>
        </form>
    </div>
);
}
export default CreateTestcase;