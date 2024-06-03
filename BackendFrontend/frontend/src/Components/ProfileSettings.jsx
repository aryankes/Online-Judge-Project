import React, {useState,useEffect} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function ProfileSettings(){
    const {id:userhandle}=useParams();
    const navigate = useNavigate();
    const[formData,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
    });
    useEffect(() => {
        async function fetchUser() {
          try {
            const response = await axios.get(`http://localhost:5000/api/example/read/${userhandle}`);
            setData({
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
    // let confirmPassword=formData.password;
    const handleSubmit= async(e)=>{        
        if(formData.confirmPassword!==formData.newPassword){
        
            alert("Confirmation Mismatch");
            return;
        }
        e.preventDefault();
        try{
            // console.log(formData);
            const response= await axios.put(`http://localhost:5000/api/example/update/${userhandle}`,formData);
            alert(`Success: ${response.data.message}`);
            // navigate('/homepage');
            navigate(`/Profile/${userhandle}`);
        }
        catch(error){
            console.log("error in submitting while updating profile settings");
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
                <br /><div>
                    <label >
                        Old Password:
                        <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} required  />
                    </label>
                </div>
                <br /><div>
                    <label >
                        New Password:
                        <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Leave it blank if you do not want to change the password" />
                    </label>
                </div>
                <br /><div>
                    <label >
                        Confirm Password:
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}   />
                    </label>
                </div>
                <br />
                <button type="submit"> Update </button>
                <br />
            </form>
        </div>
            
        
    )

}
export default ProfileSettings;