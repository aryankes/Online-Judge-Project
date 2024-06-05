import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials=true;
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
function Profile(){
    const navigate=useNavigate();
    const{id:userhandle}=useParams();
    const [user,setuser]=useState("");
    useEffect(()=>{
        async function fetchUser(){
            try {
                const response=await axios.get(`http://localhost:5000/api/example/read/${userhandle}`)
                setuser(response.data);
            } catch (error) {
                console.error("Error fetching User Details:", error); 
            }
        }
        fetchUser();
    },[]);
    
return (
    <div>
        <Navbar/>
      <h1>{user.userhandle}</h1>
      <br />{user.userhandle===localStorage.userhandle? (<button onClick={()=>{navigate(`/ProfileSettings/${userhandle}`)}}>Profile Settings</button>):(<></>)}
      <button onClick={()=>{navigate(`/Submissions/userhandle/${userhandle}`)}}>Submissions</button>

      <br />{`${user.firstName} ${user.lastName}`}
      <br /><br /><span>Email: {user.email}</span>
      <br /><br /><span>Registered On: {(String(user.DateTime)).split('T')[0]}</span>
      <br /><br /><span>Total Submissions: {user.TotalSubmissions}</span>
      <br /><br /><span>Total Accepted: {user.TotalAccepted}</span>
      <br /><br />
      {/* <img 
        src={`data:${user.img.contentType};base64,${Buffer.from(user.img.data).toString('base64')}`} 
        alt="User Avatar" 
      /> */}
    </div>
  );
}
export default Profile;