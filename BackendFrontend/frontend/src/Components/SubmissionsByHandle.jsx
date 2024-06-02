// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// axios.defaults.withCredentials = true;
// import Navbar from './Navbar';
// import { useNavigate } from 'react-router-dom';
// function Submissions() {
//   const [submission, setsubmission] = useState({
//     SID:"",
//     DateTime:"",
//     userhandle:"",
//     PID:"",
//     language:"",
//     Status:"",
//   });
// //   console.log(useParams());

//   useEffect(() => {
//     async function fetchDescription() {
        
//       try {
//         const response = await axios.get(`http://localhost:5000/api/submissions/readbyhandle`);
//         setsubmission(response.data);
//       } 
//       catch (error) {
//         console.error('Error fetching Submission:', error);
//       }
//     }

//     fetchDescription();
//   }, []);
  
//   return (
//     <div>
//         <Navbar/>
//       <h1>Testcase {`${Testcase.TID} `}</h1>
//       <br />
//       Input:
//       <br />
//       {`${Testcase.Input}`}
//       <br />
//       Solution:
//       <br />
//       {`${Testcase.Solution}`}
//     </div>
//   );
// }

// export default Submissions;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';

function SubmissionsByHandle() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get(`http://localhost:5000/api/submissions/readbyhandle`);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    }

    fetchSubmissions();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Submissions</h1>
      <table border="1">
        <thead>
          <tr>
            <th>SID</th>
            <th>DateTime</th>
            <th>User Handle</th>
            <th>PID</th>
            <th>Language</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.SID}</td>
              <td>{new Date(submission.DateTime).toLocaleString()}</td>
              <td>{submission.userhandle}</td>
              <td>{submission.PID}</td>
              <td>{submission.language}</td>
              <td>{submission.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionsByHandle;
