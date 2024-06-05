import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';
import { Link,useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
function Submissions() {
  const userRole=localStorage.getItem('userRole');

    let{filterField:filterField,filterValue:filterValue}=useParams();
    // console.log(filterField,filterValue);
  const [submissions, setSubmissions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'DateTime', direction: 'desc' });
  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get(`http://localhost:5000/api/submissions/read?filterField=${filterField}&filterValue=${filterValue}&sortField=${sortConfig.key}&sortOrder=${sortConfig.direction}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    }

    fetchSubmissions();
  }, [sortConfig,filterField]);
  const sort=(key)=>{
    let direction = 'asc';
    if (sortConfig.key === key)  {
      if(sortConfig.direction==='asc'){
        direction = 'desc';
      }
      else{
        direction='asc';
      }
      
    }
    setSortConfig({ key, direction });
  }
  const handleDelete=async (id)=>{
    if (window.confirm('Do you really want to delete?')) {
        try {
          const response = await axios.delete(`http://localhost:5000/api/submissions/delete/${id}`);
          alert(`Success: ${response.data.message}`);
          //refreshing the list of problems
          setSubmissions(submissions.filter(submission => submission._id !== id));
        } catch (error) {
          console.error('Error deleting problem:', error);
          alert(`Error: ${error.response.data}`); // Include server error response in alert message
  
        }
      }
  }
  const len=submissions.length;
  const handleViewCode = (code) => {
    return (
      <Popup trigger={<button>ViewCode</button>} modal nested>
        {(close) => (
          <div className="modal" style={{backgroundColor: 'yellow',margin:10,padding:20,border:10}}>
            <div className="content">
              <pre>{code}</pre>
            </div>
            <div>
              <button onClick={() => close()}>Close</button>
            </div>
          </div>
        )}
      </Popup>
    );
  };
  return (
    <div>
      <Navbar />
      <h1>{`${filterValue} submissions`}</h1>
      <table border="1">
        <thead>
          <tr>
            {/* <th>SID</th> */}
            <th># </th>
            <th>DateTime <button onClick={()=>sort('DateTime')}>Sort</button></th>
            <th>User Handle <button onClick={()=>sort('userhandle')}>Sort</button></th>
            <th>PID <button onClick={()=>sort('PID')}>Sort</button></th>
            <th>ProblemName <button onClick={()=>sort('ProblemName')}>Sort</button></th>
            <th>Language <button onClick={()=>sort('language')}>Sort</button></th>
            <th>Status</th>
            <th>Time <button onClick={()=>sort('Time')}>Sort</button></th>
            <th>Memory <button onClick={()=>sort('Memory')}>Sort</button></th>
            <th>Code</th>
            {userRole==='admin'?(
                <>
                <th>Delete</th>
                </>
            ):(<></>)}
          </tr>
        </thead>
        <tbody>
          
          {submissions.map((submission, index) => (
            <tr key={index}>
              {/* <td>{submission.SID}</td> */}
              <td>{len-index}</td>
              <td>{new Date(submission.DateTime).toLocaleString()}</td>
              <td><Link to={`/Profile/${submission.userhandle}`}>{submission.userhandle}</Link></td>
              <td><Link to={`/ProblemDescription/${submission.PID}`}>{submission.PID}</Link></td>
              <td><Link to={`/ProblemDescription/${submission.PID}`}>{submission.ProblemName}</Link></td>
              <td>{submission.language}</td>
              <td>{submission.Status}</td>
              <td>{submission.Time} ms</td>
              <td>{submission.Memory} KB</td>
              {/* <td><button onClick={()=>{handleViewCode(submission.code)}}>ViewCode</button></td> */}
              <td>{handleViewCode(submission.code)}</td>
              {userRole==='admin'?(
                <>
                <td><button onClick={()=>{handleDelete(submission._id)}}>Delete</button></td>
                </>
            ):(<></>)}
            </tr>
          ))}
          </tbody>
      </table>
          {/* <label for="filter">Filter According</label>
          <select name="filter" id="filter" value={filterField} onChange={()=>{handleChange}}>
            <option value="userhandle">User Handle</option>
            <option value="PID">PID</option>
            <option value="ProblemName">ProblemName</option>
            <option value="language">language</option>
            <option value="Status">Status</option>

          </select> */}
        

    </div>
  );
}

export default Submissions;
