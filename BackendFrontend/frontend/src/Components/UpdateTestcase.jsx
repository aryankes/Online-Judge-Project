import React, {useState,useEffect} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function UpdateTestcase(){
    const {id1:PID,id:_id}=useParams();
    
    const navigate = useNavigate();
    const[formData,setData]=useState({
        PID:PID,
        Input:"",
        Solution:"",
    });
    useEffect(() => {
        async function fetchTests() {
          try {
            const response = await axios.get(`http://localhost:5000/api/tests/readbyTId/${_id}`);
            setData(response.data);
          } 
          catch (error) {
            console.error('Error fetchingTests: for update', error);
          }
        }
    
        fetchTests();
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

            const response= await axios.put(`http://localhost:5000/api/tests/update/${_id}`,formData);
            alert(`Success: ${response.data.message}`);
            // navigate('/homepage');
            navigate(`/TestcaseDescription/${formData._id}`);

        }
        catch(error){
            console.log("error in submitting while updation of testcase");
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
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <h2>Update Testcase {_id}</h2>
                <div>
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
                <button type="submit"> Update </button>
                <br />
            </form>
        </div>
            
        
    )

}
export default UpdateTestcase;