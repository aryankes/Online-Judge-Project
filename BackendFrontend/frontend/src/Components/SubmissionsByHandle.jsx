import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';
import { API_BASE_URL } from './config';

function SubmissionsByHandle() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/submissions/readbyhandle`);
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
