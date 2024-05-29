import React, {useState,useEffect} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function UpdateProblem(){
    const {id:PID}=useParams();
    const navigate = useNavigate();    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        
        try{
            const response= await axios.put(`http://localhost:5000/api/problems/update/${PID}`,formData);
            alert(`Success: ${response.data.message}`);
            // console.log(formData);
            // navigate('/homepage');
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
            // console.log(error);
            // console.log(formData);
            // alert("An error occured. please try again.");
        }
    };

    return(
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <h2>Update Problem {PID}</h2>
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
                <button type="submit"> Update </button>
                <br />
            </form>
        </div>
            
        
    )

}
export default UpdateProblem;