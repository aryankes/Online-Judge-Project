import React, {useState} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const[formData,setData]=useState({
        line:"",
        password:"",
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
            const response= await axios.post('http://localhost:5000/api/example/login',formData);
            // console.log(response);
            alert(`Success: ${response.data.message}`);
            localStorage.setItem('userRole', response.data.role);
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
            // console.log(error);
            // console.log(formData);
            // alert("An error occured. please try again.");
        }
    };

    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            
            <div>
                <label >
                    Email/Password:
                    <input type="text" name="line" value={formData.line} onChange={handleChange} required  />
                </label>
            </div>
            <br /><div>
                <label >
                    Password:
                    <input type="text" name="password" value={formData.password} onChange={handleChange} required  />
                </label>
            </div>
            <br />
            <button type="submit">Login</button>
            <br />
        </form>
        </>
    )

}
export default Login;