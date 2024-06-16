import React,{useEffect,useState,useRef} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials=true;
import Navbar from "./Navbar";
import FriendStar from "./FriendStar";

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
    const [isFriend, setIsFriend] = useState(false); // State to track friend status
    useEffect( ()=>{
        async function fetchUser(){
            // e.preventDefault();
            try {
                const response=await axios.get(`${API_BASE_URL}/api/example/read/${userhandle}`)
                setuser(response.data.user);
                // console.log(isFriend);
                setIsFriend(response.data.isFriend);
            }       
            catch (error) {
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
                    alert("Image Uploaded Succesfully");
                    setimgPath(response.data.imgPath);

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
    <div className="w-full min-h-screen mx-auto px-20 py-8 mt-16 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{user.userhandle}</h1>
      <FriendStar userhandle={user.userhandle} isFriend={isFriend}  />
      <br />
    <div className="flex flex-wrap ">
        <div className="w-full md:w-1/2 pr-4">
            <div className=" text-lg text-gray-600 dark:text-gray-300">

                {`${user.firstName} ${user.lastName}`}
                <br /><br /><span><span className="font-bold block">Email:</span> {user.email}</span>
                <br /><br /><span><span className="font-bold block">Registered On:</span> {(String(user.DateTime)).split('T')[0]}</span>
                <br /><br />
                {user.userhandle===localStorage.userhandle? (<><Link to={`/ProfileSettings/${userhandle}`} className="text-blue-500 underline">
                    Change Settings
                </Link><br /><br />
                <Link to={`/Friends/${userhandle}`} className="text-blue-500 underline">
                    My Friends
                </Link>
                </>
            ):(<></>)}
                <br /><br />
                <Link to={`/Submissions/userhandle/${userhandle}`} className="text-blue-500 mr-8 underline">
                    Submissions
                </Link>
            </div>
        </div>
        <div className="w-full md:w-1/4 pl-4 ">
            <div className="inline">
                <img  src={imgPath ? `${API_URI}/${imgPath}` : `${API_URI}/uploads/cf_blank.jpg`} alt="Profile" />
                <br />
                <div className="flex justify-center mt-1">
                {(imgPath&&localStorage.userhandle===`${userhandle}`)?(<button onClick={removeImage} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 ">Remove</button>):(<></>)}
                {(localStorage.userhandle===`${userhandle}`)?(<>
                    <button  onClick={handleImageChange} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">Change</button>
                    <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => { setFile(e.target.files[0]) }}></input>
                    </>
            ):(<></>)}
                </div>
                
            </div>
            
        </div>
        <div className="w-full md:w-3/4  mt-2">
            <SubmissionHeatmap userhandle={userhandle}/>
        </div>
        </div>
        </div>
        
    </div>
  );
}
export default Profile;