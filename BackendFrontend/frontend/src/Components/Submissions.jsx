import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';
import { Link,useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { API_BASE_URL } from './config';

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
        const response = await axios.get(`${API_BASE_URL}/api/submissions/read?filterField=${filterField}&filterValue=${filterValue}&sortField=${sortConfig.key}&sortOrder=${sortConfig.direction}`);
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
          const response = await axios.delete(`${API_BASE_URL}/api/submissions/delete/${id}`);
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
      <Popup trigger={<button className='text-blue-500 underline hover:text-blue-600'>ViewCode</button>} modal nested>
        {(close) => (
          <div  className=" bg-gray-200 p-2 border-10 border-blue-900 rounded">
            <div className="content">
              <pre>{code}</pre>
            </div>
            <div>
              <button onClick={() => close()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800'>Close</button>
            </div>
          </div>
        )}
      </Popup>
    );
  };
  // return (
  //   <div>
  //     <Navbar />
  //     <h1>{`${filterValue} submissions`}</h1>
  //     <table border="1">
  //       <thead>
  //         <tr>
  //           {/* <th>SID</th> */}
  //           <th># </th>
  //           <th>DateTime <button onClick={()=>sort('DateTime')}>Sort</button></th>
  //           <th>User Handle <button onClick={()=>sort('userhandle')}>Sort</button></th>
  //           <th>PID <button onClick={()=>sort('PID')}>Sort</button></th>
  //           <th>ProblemName <button onClick={()=>sort('ProblemName')}>Sort</button></th>
  //           <th>Language <button onClick={()=>sort('language')}>Sort</button></th>
  //           <th>Status</th>
  //           <th>Time <button onClick={()=>sort('Time')}>Sort</button></th>
  //           <th>Memory <button onClick={()=>sort('Memory')}>Sort</button></th>
  //           <th>Code</th>
  //           {userRole==='admin'?(
  //               <>
  //               <th>Delete</th>
  //               </>
  //           ):(<></>)}
  //         </tr>
  //       </thead>
  //       <tbody>
          
  //         {submissions.map((submission, index) => (
  //           <tr key={index}>
  //             {/* <td>{submission.SID}</td> */}
  //             <td>{len-index}</td>
  //             <td>{new Date(submission.DateTime).toLocaleString()}</td>
  //             <td><Link to={`/Profile/${submission.userhandle}`}>{submission.userhandle}</Link></td>
  //             <td><Link to={`/ProblemDescription/${submission.PID}`}>{submission.PID}</Link></td>
  //             <td><Link to={`/ProblemDescription/${submission.PID}`}>{submission.ProblemName}</Link></td>
  //             <td>{submission.language}</td>
  //             <td>{submission.Status}</td>
  //             <td>{submission.Time} ms</td>
  //             <td>{submission.Memory} KB</td>
  //             {/* <td><button onClick={()=>{handleViewCode(submission.code)}}>ViewCode</button></td> */}
  //             <td>{handleViewCode(submission.code)}</td>
  //             {userRole==='admin'?(
  //               <>
  //               <td><button onClick={()=>{handleDelete(submission._id)}}>Delete</button></td>
  //               </>
  //           ):(<></>)}
  //           </tr>
  //         ))}
  //         </tbody>
  //     </table>
  //         {/* <label for="filter">Filter According</label>
  //         <select name="filter" id="filter" value={filterField} onChange={()=>{handleChange}}>
  //           <option value="userhandle">User Handle</option>
  //           <option value="PID">PID</option>
  //           <option value="ProblemName">ProblemName</option>
  //           <option value="language">language</option>
  //           <option value="Status">Status</option>

  //         </select> */}
        

  //   </div>
  // );
  return (
    <div className=" min-h-screen dark:bg-gray-800 dark:text-white">
      <Navbar />
      <div className='   mx-auto px-4 py-8 mt-16 **auto**'>
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{`${filterValue} submissions`}</h1>
    <table className=" border-collapse  border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="border  border-gray-300 p-2 dark:border-gray-600"># </th>
            <th className="border  border-gray-300 p-2 dark:border-gray-600">DateTime <button onClick={() => sort('DateTime')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800'>Sort</button></th>
            <th className="border  border-gray-300 p-2 dark:border-gray-600">User Handle <button onClick={() => sort('userhandle')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800'>Sort</button></th>
            <th className="border  border-gray-300 p-2 dark:border-gray-600">PID <button onClick={() => sort('PID')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800'>Sort</button></th>
            <th className="border  border-gray-300 p-2 dark:border-gray-600">ProblemName <button onClick={() => sort('ProblemName')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800'>Sort</button></th>
            <th className="border  border-gray-300 p-2 dark:border-gray-600">Language <button onClick={() => sort('language')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800'>Sort</button></th>
            <th className="border  border-gray-300 p-2 dark:border-gray-600">Status</th>
            <th className="border  border-gray-300 p-2 dark:border-gray-600">Time <button onClick={() => sort('Time')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800'>Sort</button></th>
            <th className="border  border-gray-300 p-2 dark:border-gray-600">Memory <button onClick={() => sort('Memory')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800'>Sort</button></th>
            <th className="border  border-gray-300 p-2 dark:border-gray-600">Code</th>
            {userRole === 'admin' && (
              <th className="border p-2">Delete</th>
            )}
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td className="border p-2">{len - index}</td>
              <td className="border p-2">{new Date(submission.DateTime).toLocaleString()}</td>
              <td className="border p-2"><Link to={`/Profile/${submission.userhandle}`} className="text-blue-500 underline hover:text-blue-600">{submission.userhandle}</Link></td>
              <td className="border p-2"><Link to={`/ProblemDescription/${submission.PID}`} className="text-blue-500 underline hover:text-blue-600">{submission.PID}</Link></td>
              <td className="border p-2"><Link to={`/ProblemDescription/${submission.PID}`} className="text-blue-500 underline hover:text-blue-600">{submission.ProblemName}</Link></td>
              <td className="border p-2">{submission.language}</td>
              <td className={submission.Status==="Accepted"?("border p-2 font-bold text-green-500"):("border p-2 text-red-500")}>{submission.Status}</td>
              <td className="border p-2">{submission.Time} ms</td>
              <td className="border p-2">{submission.Memory} KB</td>
              <td className="border p-2">{handleViewCode(submission.code)}</td>
              {userRole === 'admin' && (
                <td className="border p-2"><button onClick={() => handleDelete(submission._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );

}

export default Submissions;
