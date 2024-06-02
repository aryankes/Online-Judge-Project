import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';
import { useParams } from "react-router-dom";

function SubmissionsByPID() {
  const [submissions, setSubmissions] = useState([]);
  const { id: PID } = useParams();
  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get(`http://localhost:5000/api/submissions/readbyPID/${PID}`);
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
      <h1>SubmissionsByPID</h1>
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

export default SubmissionsByPID;
