import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Link,useParams } from 'react-router-dom';
import { API_BASE_URL } from './config';
import '../../themes/heatmap.css'

function SubmissionHeatmap(userhandle) {
    const [submissions, setSubmissions] = useState([]);
    // const {id:userhandle}=useParams();
    useEffect(() => {
        // Fetch submission data from your backend API
        async function fetchSub(){
            // e.preventDefault();
            try {
                const response=await  axios.get(`${API_BASE_URL}/api/submissions/read?filterField=userhandle&filterValue=${userhandle}&sortField=${DateTime}&sortOrder=${asc}`)
                console.log(response);
                setSubmissions(response.data);
            } catch (error) {
                console.error("Error fetching Submissions Details:", error); 
            }
        }
        fetchSub();
        
    }, []);
    console.log(submissions);
    // Aggregate submissions by date
    const aggregatedData = {};
    submissions.forEach(submission => {
        const date = new Date(submission.DateTime).toDateString();
        if (aggregatedData[date]) {
            aggregatedData[date]++;
        } else {
            aggregatedData[date] = 1;
        }
    });

    // Convert aggregated data to heatmap format
    const heatmapData = Object.keys(aggregatedData).map(date => ({
        date: new Date(date),
        count: aggregatedData[date]
    }));

    return (
        <div>
            <h2>Submission Heatmap</h2>
            <CalendarHeatmap
                startDate={new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate())}
                endDate={new Date()}
                values={heatmapData}
                classForValue={(value) => {
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
                style={{
                    width: '100%',
                    height: '400px',
                    margin: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    boxSizing: 'border-box',
                    // Add more styles as needed
                }}
            />
        </div>
    );
}

export default SubmissionHeatmap;
