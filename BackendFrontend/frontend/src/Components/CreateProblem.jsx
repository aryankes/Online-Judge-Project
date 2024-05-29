import React, {useState} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';

import { useNavigate } from 'react-router-dom';

function CreateProblem(){
    const navigate = useNavigate();
    const[formData,setData]=useState({
        PID:"",
        ProblemName:"",
        ProblemDescription:"",
        ProblemLevel:"",
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
            const response= await axios.post('http://localhost:5000/api/problems/create',formData);
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
                alert(`Error: ${error.response.data}`); // Include server error response in alert message
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
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <h2>Create a New Problem</h2>
                <div>
                    <label >
                        PID:
                        <input type="text" name="PID" value={formData.PID} onChange={handleChange} required  />
                    </label>
                </div>
                <br />
                <div>
                    <label >
                        ProblemName:
                        <input type="text" name="ProblemName" value={formData.ProblemName} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label >
                        ProblemDescription:
                        <input type="text" name="ProblemDescription" value={formData.ProblemDescription} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label >
                        ProblemLevel:
                        <input type="text" name="ProblemLevel" value={formData.ProblemLevel} onChange={handleChange} required  />
                    </label>
                </div>
                <br />
                <button type="submit"> Create </button>
                <br />
            </form>
        </div>
            
        
    )

}
export default CreateProblem;