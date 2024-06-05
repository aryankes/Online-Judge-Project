import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials=true;
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const API_URI = 'http://localhost:5000';
function Profile(){
    const navigate=useNavigate();
    const{id:userhandle}=useParams();
    const [user,setuser]=useState("");
    const [File,setFile]=useState('');
    const [imgPath,setimgPath]=useState('');

    useEffect( ()=>{
        async function fetchUser(){
            // e.preventDefault();
            try {
                
                const response=await axios.get(`http://localhost:5000/api/example/read/${userhandle}`)
                setuser(response.data);
                

            } catch (error) {
                console.error("Error fetching User Details:", error); 
            }
        }
        fetchUser();
    },[]);
    useEffect(() => {
        setimgPath(user.imgPath);
    }, [user]);
    useEffect(()=>{
        const handleUpload=async ()=>{
            if(File){
                try {
                    const formData = new FormData();
                    formData.append('file', File);
                    const response=await axios.post(`${API_URI}/api/example/upload/${userhandle}`,formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    setimgPath(user.imgPath);
                    alert("Image Uploaded Succesfully");
                } catch (error) {
                    console.log("Error Uploading Image:",error);
                    alert("Error uploading Image");
                }
            }
        }
        handleUpload();
    },[File])
    const removeImage = async () => {
        try {
            await axios.delete(`${API_URI}/api/example/removeImg/${userhandle}`);
            setimgPath('');
            alert("Image Removed Successfully");
        } catch (error) {
            console.error("Error removing Image:", error);
            alert("Error removing Image");
        }
    };
return (
    <div>
        <Navbar/>
      <h1 className="mt-16">{user.userhandle}</h1>
      <br />{user.userhandle===localStorage.userhandle? (<button onClick={()=>{navigate(`/ProfileSettings/${userhandle}`)}}>Profile Settings</button>):(<></>)}
      <button onClick={()=>{navigate(`/Submissions/userhandle/${userhandle}`)}}>Submissions</button>

      <br />{`${user.firstName} ${user.lastName}`}
      <br /><br /><span>Email: {user.email}</span>
      <br /><br /><span>Registered On: {(String(user.DateTime)).split('T')[0]}</span>
      <br /><br /><span>Total Submissions: {user.TotalSubmissions}</span>
      <br /><br /><span>Total Accepted: {user.TotalAccepted}</span>
      <br />

      <br />
    
        <div>
            <img src={imgPath ? `${API_URI}/${imgPath}` : `${API_URI}/uploads/cf_blank.jpg`} alt="Profile" style={{ maxWidth: 400, height: 400*(1800/2880) }}/>
            {(imgPath)?(<button onClick={removeImage}>Remove Image</button>):(<></>)}
        </div>
    
    <br />
    <label htmlFor="img"> Change Photo </label>
    <input type="file" name="img" id="img" onChange={(e)=>{setFile(e.target.files[0])}} />

      {/* <label htmlFor="img"> Change Photo </label>
      <input type="file" name="img" id="img" onChange={(e)=>{setFile(e.target.files[0])}} /> */}
    </div>
  );

}
export default Profile;