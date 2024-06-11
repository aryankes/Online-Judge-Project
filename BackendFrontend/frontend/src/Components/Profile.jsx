import React,{useEffect,useState,useRef} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials=true;
import Navbar from "./Navbar";
import { useNavigate,Link } from "react-router-dom";
import { API_BASE_URL } from './config';
import SubmissionHeatmap from "./SubmissionHeatmap";

const API_URI = `${API_BASE_URL}`;
function Profile(){
    const navigate=useNavigate();
    const{id:userhandle}=useParams();
    const [user,setuser]=useState("");
    const [File,setFile]=useState('');
    const [imgPath,setimgPath]=useState('');
    const fileInputRef = useRef(null);
    useEffect( ()=>{
        async function fetchUser(){
            // e.preventDefault();
            try {
                const response=await axios.get(`${API_BASE_URL}/api/example/read/${userhandle}`)
                setuser(response.data);
            } catch (error) {
                console.error("Error fetching User Details:", error); 
            }
        }
        fetchUser();
    },[imgPath]);
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
                    // await setimgPath(user.imgPath);
                    alert("Image Uploaded Succesfully");
                    setimgPath(response.data.imgPath);
                //  window.location.reload();

                } catch (error) {
                    console.log("Error Uploading Image:",error);
                    alert("Error uploading Image");
                }
            }
        }
        handleUpload();
    },[File])
    useEffect(() => {
        setimgPath(user.imgPath);
    }, [user]);
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
    const handleImageChange = () => {
        fileInputRef.current.click();
    };

  return (
    <div>
        <Navbar/>
    <div className="w-full min-h-screen mx-auto px-4 py-8 mt-16 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{user.userhandle}</h1>
      <br />{user.userhandle===localStorage.userhandle? (<Link to={`/ProfileSettings/${userhandle}`} className="text-blue-500 mr-8 underline">
        Profile Settings
    </Link>):(<></>)}
    <Link to={`/Submissions/userhandle/${userhandle}`} className="text-blue-500 mr-8 underline">
        Submissions
    </Link>
    <div className="flex flex-wrap mt-4">
    <div className="w-full md:w-1/2 pr-4">
    <div className="text-lg text-gray-600 dark:text-gray-300">

      <br />{`${user.firstName} ${user.lastName}`}
      <br /><br /><span>Email: {user.email}</span>
      <br /><br /><span>Registered On: {(String(user.DateTime)).split('T')[0]}</span>
      <br /><br /><span className="mr-16">Total Submissions: {user.TotalSubmissions}</span>
      <span>Total Accepted: {user.TotalAccepted}</span>
      
    </div>
    </div>
    <div className="w-full md:w-1/2 pl-4">
        <div className="inline">
            <img  src={imgPath ? `${API_URI}/${imgPath}` : `${API_URI}/uploads/cf_blank.jpg`} alt="Profile" style={{ maxWidth: 300, height: 300*(1800/2880) }}/>
            <br />
            {(imgPath&&localStorage.userhandle===`${userhandle}`)?(<button onClick={removeImage} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-10">Remove Image</button>):(<></>)}
        </div>
    {(localStorage.userhandle===`${userhandle}`)?(<>
        <button  onClick={handleImageChange} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Change Image</button>
        <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => { setFile(e.target.files[0]) }}></input>
        </>
    ):(<></>)}
    
    
    </div>
    </div>
        {/* <SubmissionHeatmap userhandle={userhandle}/> */}
    </div>
        
    </div>
  );
}
export default Profile;