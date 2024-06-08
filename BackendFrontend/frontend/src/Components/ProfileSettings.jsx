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
        e.preventDefault();

        if(formData.confirmPassword!==formData.newPassword){
        
            alert("Confirmation Mismatch");
            return;
        }
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

        // <div>
        //     <Navbar/>
        //     <form onSubmit={handleSubmit}>
        //         <h2>Update Settings</h2>
        //         <div>
        //             <label >
        //                 FirstName:
        //                 <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required  />
        //             </label>
        //         </div>
        //         <br /><div>
        //             <label >
        //                 LastName:
        //                 <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required  />
        //             </label>
        //         </div>
        //         <br /><div>
        //             <label >
        //                 Email:
        //                 <input type="text" name="email" value={formData.email} onChange={handleChange} required  />
        //             </label>
        //         </div>
        //         <br /><div>
        //             <label >
        //                 Old Password:
        //                 <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} required  />
        //             </label>
        //         </div>
        //         <br /><div>
        //             <label >
        //                 New Password:
        //                 <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Leave it blank if you do not want to change the password" />
        //             </label>
        //         </div>
        //         <br /><div>
        //             <label >
        //                 Confirm Password:
        //                 <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}   />
        //             </label>
        //         </div>
        //         <br />
        //         <button type="submit"> Update </button>
        //         <br />
        //     </form>
        // </div>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Navbar/>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Update Settings</h2>
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="firstName">
                First Name:
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name:
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="email">
                Email:
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
        </div>
        <div className='mb-4'>
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="oldPassword">
                Old Password:
            </label>
                <input 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password" id="oldPassword" name="oldPassword" value={formData.password} onChange={handleChange} required  />
            </div>
        <div className='mb-4'>
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password:
            </label>
                <input 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password" id="newPassword" name="newPassword" value={formData.password} onChange={handleChange}   />
        </div>
        <div className='mb-4'>
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password:
            </label>
                <input 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password" id="confirmPassword" name="confirmPassword" value={formData.password} onChange={handleChange}  />
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
        
    )

}
export default ProfileSettings;