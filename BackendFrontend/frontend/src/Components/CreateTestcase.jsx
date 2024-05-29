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
        TID:"",
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
        // if(formData.password!==formData.confirm_password){
        //     alert('Password not match with confirmPassword');
        //     return ;
        // }
        try{
            const response= await axios.post('http://localhost:5000/api/tests/create',formData);
            alert(`Success: ${response.data.message}`);
            // console.log(formData);
            navigate(`/TestcaseDescription/${formData.TID}`);
        }
        catch(error){
            console.log("error in submitting while creating testcase");
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
                <h2>Create a New Test</h2>
                {/* {console.log(formData)} */}
                <div>
                    <label >
                        TID:
                        <input type="text" name="TID" value={formData.TID} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label >
                        Input:
                        <input type="text" name="Input" value={formData.Input} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label >
                        Solution:
                        <input type="text" name="Solution" value={formData.Solution} onChange={handleChange} required  />
                    </label>
                </div>
                <br />
                <button type="submit"> Create </button>
                <br />
            </form>
        </div>
            
        
    )

}
export default CreateTestcase;