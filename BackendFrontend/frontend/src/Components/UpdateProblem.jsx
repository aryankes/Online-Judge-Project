import React, {useState,useEffect} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function UpdateProblem(){
    const {id:PID}=useParams();
    const navigate = useNavigate();
    const[formData,setData]=useState({
        PID:PID,
        ProblemName:"",
        ProblemDescription:"",
        ProblemLevel:"",
        TimeLimit:"",
    });
    useEffect(() => {
        async function fetchProblem() {
          try {
            const response = await axios.get(`http://localhost:5000/api/problems/read/${PID}`);
            setData(response.data);
          } 
          catch (error) {
            console.error('Error fetching problems:', error);
          }
        }
    
        fetchProblem();
    }, []);
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
            const response= await axios.put(`http://localhost:5000/api/problems/update/${PID}`,formData);
            alert(`Success: ${response.data.message}`);
            // console.log(formData);
            // navigate('/homepage');
            navigate(`/ProblemDescription/${formData.PID}`);

        }
        catch(error){
            console.log("error in submitting while registering");
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
        // <div>
        //     <Navbar/>
        //     <form onSubmit={handleSubmit}>
        //         <h2>Update Problem {PID}</h2>
        //         {/* <div>
        //             <label >
        //                 PID:
        //                 <input type="text" name="PID" value={formData.PID} onChange={handleChange} required  />
        //             </label>
        //         </div> */}
        //         <br />
        //         <div>
        //             <label >
        //                 Name:
        //                 <input type="text" name="ProblemName" value={formData.ProblemName} onChange={handleChange} required  />
        //             </label>
        //         </div>
        //         <br /><div>
        //             <label >
        //                 Description:
        //                 <input type="text" name="ProblemDescription" value={formData.ProblemDescription} onChange={handleChange} required  />
        //             </label>
        //         </div>
        //         <br /><div>
        //             <label >
        //                 <span className=" text-gray-700 mr-3">Level: </span>
        //                 <label htmlFor="Easy" className=" text-gray-700 mr-1">Easy</label>
        //                 <input id="Easy" type="radio" name="ProblemLevel" value={"Easy"} onChange={handleChange} required className='mr-2 p-2' />
                        
        //                 <label htmlFor="Medium" className=" text-gray-700 mr-1">Medium</label>
        //                 <input id="Medium" type="radio" name="ProblemLevel" value={"Medium"} onChange={handleChange} required className='mr-2 p-2' />
                        
        //                 <label htmlFor="Hard" className=" text-gray-700 mr-1">Hard</label>
        //                 <input id="Hard" type="radio" name="ProblemLevel" value={"Hard"} onChange={handleChange} required className='mr-2 p-2' />
        //             </label>
        //         </div>
        //         <br /><div>
        //             <label >
        //                 TimeLimit:
        //                 <input type="text" name="TimeLimit" value={formData.TimeLimit} onChange={handleChange} required placeholder='TimeLimit in seconds'  />
        //             </label>
        //         </div>
        //         <br />
        //         <button type="submit"> Update </button>
        //         <br />
        //     </form>
        // </div>
            
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
            <Navbar/>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Update Problem</h2>
                <div>
                    <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                        PID:
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        
                        type="text" name="PID" value={formData.PID} onChange={handleChange} required  />
                    </label>
                </div>
                <br />
                <div>
                    <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                        Name:
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        
                        type="text" name="ProblemName" value={formData.ProblemName} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                        Description:
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        
                        type="text" name="ProblemDescription" value={formData.ProblemDescription} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" >
                        TimeLimit:
                        <input 
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" name="TimeLimit" value={formData.TimeLimit} onChange={handleChange} required  />
                    </label>
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
                    Update
                </button>
            </div>
            </form>
        </div>
    )

}
export default UpdateProblem;