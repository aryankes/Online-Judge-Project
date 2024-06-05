import React, {useState,useEffect} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function UpdateUser(){
    const {id:userhandle}=useParams();
    const navigate = useNavigate();
    const[formData,setData]=useState({
        userhandle:"",
        firstName:"",
        lastName:"",
        email:"",
    });
    useEffect(() => {
        async function fetchUser() {
          try {
            const response = await axios.get(`http://localhost:5000/api/example/read/${userhandle}`);
            setData({
                handle:response.data.userhandle,
                firstName:response.data.firstName,
                lastName:response.data.lastName,
                email:response.data.email,
                // password:response.data.password,
            });
          } 
          catch (error) {
            console.error('Error fetchingUser: for update', error);
          }
        }
    
        fetchUser();
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
            const response= await axios.put(`http://localhost:5000/api/example/updateAdmin/${userhandle}`,formData);
            alert(`Success: ${response.data.message}`);
            // navigate('/homepage');
            navigate(`/Profile/${response.data.user.userhandle}`);
        }
        catch(error){
            console.log("error in submitting while updating profile settings");
            console.log(error);
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
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <h2>Update Settings</h2>
                <div>
                    <label >
                        New Handle:
                        <input type="text" name="handle" value={formData.handle} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label >
                        FirstName:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label >
                        LastName:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label >
                        Email:
                        <input type="text" name="email" value={formData.email} onChange={handleChange} required  />
                    </label>
                </div>
                <br />
                <button type="submit"> Update </button>
                <br />
            </form>
        </div>
            
        
    )

}
export default UpdateUser;