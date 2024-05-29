import React, {useState} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

import { useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    const[formData,setData]=useState({
        firstName:"",
        lastName:"",
        userhandle:"",
        email:"",
        password:"",
        // confirm_password:"",
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
        // if(formData.password!==formData.confirm_password){
        //     alert('Password not match with confirmPassword');
        //     return ;
        // }
        try{
            const response= await axios.post('http://localhost:5000/api/example/register',formData);
            alert(`Success: ${response.data.message}`);
            // console.log(formData);
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
        
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label >
                    Firstname:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required  />
                </label>
            </div>
            <br />
            <div>
                <label >
                    Lastname:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required  />
                </label>
            </div>
            <br /><div>
                <label >
                    Userhandle:
                    <input type="text" name="userhandle" value={formData.userhandle} onChange={handleChange} required  />
                </label>
            </div>
            <br /><div>
                <label >
                    Email:
                    <input type="text" name="email" value={formData.email} onChange={handleChange} required  />
                </label>
            </div>
            <br /><div>
                <label >
                    Password:
                    <input type="text" name="password" value={formData.password} onChange={handleChange} required  />
                </label>
            </div>
            <br /><div>
                Role:
                <label htmlFor="user">User</label>
                <input id="user" type="radio" name="role" value={"user"} onChange={handleChange} required  />

                <label htmlFor="admin">Admin</label>
                <input id="admin" type="radio" name="role" value={"admin"} onChange={handleChange} required  />
            </div>
            <br />
            <button type="submit"> Register </button>
            <br />
        </form>
        
    )

}
export default Register;