// import React, {useState} from 'react';
// import axios from 'axios';
// axios.defaults.withCredentials = true;
// // import '../index.css'
// import { useNavigate } from 'react-router-dom';

// function Login(){
//     const navigate = useNavigate();
//     const[formData,setData]=useState({
//         line:"",
//         password:"",
//     });

//     const handleChange= (e)=>{
//         const{name,value}=e.target;
//         setData((prevData)=>({
//             ...prevData,
//             [name]: value
//         }));
//     };
    
//     const handleSubmit= async(e)=>{
//         e.preventDefault();
//         // if(formData.password!==formData.confirm_password){
//         //     alert('Password not match with confirmPassword');
//         //     return ;
//         // }
//         try{
//             const response= await axios.post('http://localhost:5000/api/example/login',formData);
//             // console.log(response);
//             alert(`Success: ${response.data.message}`);
//             localStorage.setItem('userRole', response.data.role);
//             localStorage.setItem('userhandle', response.data.userhandle);
//             navigate('/homepage');

//         }
//         catch(error){
//             console.log("error in submitting while registering");
//             if (error.response) {
//                 console.error('Response data:', error.response.data);
//                 console.error('Response status:', error.response.status);
//                 console.error('Response headers:', error.response.headers);
//                 alert(`Error: ${error.response.data}`); // Include server error response in alert message
//               } 
//               else if (error.request) {
//                 console.error('Request data:', error.request);
//               } 
//               else {
//                 console.error('Error message:', error.message);
//               }
//             // console.log(error);
//             // console.log(formData);
//             // alert("An error occured. please try again.");
//         }
//     };

//     return(
//         <div min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8>
//         <form onSubmit={handleSubmit}>
//             <h2>Login</h2>
            
//             <div>
//                 <label >
//                     Email/Password:
//                     <input type="text" name="line" value={formData.line} onChange={handleChange} required  />
//                 </label>
//             </div>
//             <br /><div>
//                 <label >
//                     Password:
//                     <input type="password" name="password" value={formData.password} onChange={handleChange} required  />
//                 </label>
//             </div>
//             <br />
//             <button type="submit">Login</button>
//             <br />
//         </form>
//         </div>
//     )

// }
// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

function Login() {
    const navigate = useNavigate();
    const [formData, setData] = useState({
        line: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/example/login', formData);
            alert(`Success: ${response.data.message}`);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userhandle', response.data.userhandle);
            navigate('/homepage');
        } catch (error) {
            console.error("Error in submitting while registering");
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                alert(`Error: ${error.response.data}`);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
                    <div>
                        <label className="block text-gray-700">Email/Handle</label>
                        <input type="text" name="line" value={formData.line} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Login</button>
                    </div>
                </form>
            <div className="text-center text-red-500">Don't have an account. <Link to="/" className="text-blue-600">Register</Link></div>

            </div>
        </div>
    );
}

export default Login;
