import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Link,useParams } from 'react-router-dom';
import { API_BASE_URL } from './config';
import '../../themes/heatmap.css'

function SubmissionHeatmap(userhandle) {
    // console.log(userhandle);
    const [submissions, setSubmissions] = useState([]);
    const [user,setuser]=useState("");

    // const {id:userhandle}=useParams();
    useEffect(() => {
        // Fetch submission data from your backend API
        async function fetchSub(){
            // e.preventDefault();
            try {
                const response=await  axios.get(`${API_BASE_URL}/api/submissions/read?filterField=userhandle&filterValue=${userhandle.userhandle}&sortField=DateTime&sortOrder=asc`)
                // console.log(response);
                setSubmissions(response.data);
            } catch (error) {
                console.error("Error fetching Submissions Details:", error); 
            }
        }
        fetchSub();
        
    }, []);
    useEffect( ()=>{
        async function fetchUser(){
            // e.preventDefault();
            try {
                const response=await axios.get(`${API_BASE_URL}/api/example/read/${userhandle.userhandle}`)
                setuser(response.data);
            }
            catch (error) {
                console.error("Error fetching User Details:", error); 
            }
        }
        fetchUser();
    },[]);
    // console.log(submissions);
    const aggregatedData = {};
    submissions.forEach(submission => {
        const date = new Date(submission.DateTime).toDateString();
        if (aggregatedData[date]) {
            aggregatedData[date]++;
        } else {
            aggregatedData[date] = 1;
        }
    });

    const heatmapData = Object.keys(aggregatedData).map(date => ({
        date: new Date(date),
        count: aggregatedData[date]
    }));
    // console.log(heatmapData);
    return (
        <div className='p-1 '>
            <h1 className='text-gray-200'>Submission Heatmap</h1>
            <div className='p-8 border-2 border-gray-500 rounded-lg'>
            <CalendarHeatmap
                startDate={new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate())}
                endDate={new Date()}
                values={heatmapData}
                classForValue={(value) => {
                    // console.log(value);
                    if (!value || value.count === 0) {
                        return 'color-empty';
                    }
                    if (value.count <= 2) {
                        return 'color-scale-low';
                    }
                    if (value.count <= 5) {
                        return 'color-scale-medium';
                    }
                    return 'color-scale-high';
                }}
                // style={{
                //     width: '100%',
                //     height: '400px',
                //     margin: 'auto',
                //     border: '1px solid #ccc',
                //     borderRadius: '5px',
                //     padding: '10px',
                //     boxSizing: 'border-box',
                //     // Add more styles as needed
                // }}
            />
            <br /><br /><span className="mr-16">Total Submissions: {user.TotalSubmissions}</span>
            <span>Total Accepted: {user.TotalAccepted}</span>
            </div>
        </div>
    );
}

export default SubmissionHeatmap;
