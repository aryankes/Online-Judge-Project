import './App.css'
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CookiesProvider } from 'universal-cookie';
// import { AuthProvider } from './AuthContext';
// import Login from './Components/Login';
import Profile from './Components/Profile';
import ProfileSettings from './Components/ProfileSettings';
import Userlist from './Components/Userlist';
import UpdateUser from './Components/UpdateUser';


import RegisterPage from './Components/RegisterPage';
import Register from './Components/Register';
import Login from './Components/Login';

import ChangePassword from './Components/ChangePassword';
import VerifyOTP from './Components/VerifyOTP';
import ForgotPassword from './Components/ForgotPassword';

import Homepage from './Components/Homepage';

import ProblemSet from './Components/ProblemSet';
import ProblemDescription from './Components/ProblemDescription';
import UpdateProblem from './Components/UpdateProblem';
import CreateProblem from './Components/CreateProblem';

import TestcasesSet from './Components/TestcasesSet';
import TestcaseDescription from './Components/TestcaseDescription';
import CreateTestcase from './Components/CreateTestcase';
import UpdateTestcase from './Components/UpdateTestcase';

import SubmissionsByHandle from './Components/SubmissionsByHandle';
import SubmissionsByPID from './Components/SubmissionsByPID';
import Submissions from './Components/Submissions';

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <CookiesProvider>
      // <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            
            <Route path="/Login" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/VerifyOTP/:id" element={<VerifyOTP />} />
            <Route path="/ChangePassword/:id/:id1" element={<ChangePassword />} />

            <Route path="/homepage" element={<Homepage />} />

            <Route path="/Profile/:id" element={<Profile/>} />
            <Route path="/ProfileSettings/:id" element={<ProfileSettings/>} />
            <Route path="/Userlist" element={<Userlist/>} />
            <Route path="/UpdateUser/:id" element={<UpdateUser/>}/>
            
            <Route path="/ProblemSet" element={<ProblemSet />} />
            <Route path="/ProblemDescription/:id" element={<ProblemDescription/>}/>
            <Route path="/CreateProblem" element={<CreateProblem/>}/>
            <Route path="/UpdateProblem/:id" element={<UpdateProblem/>}/>
            
            <Route path="/TestcasesSet/:id" element={<TestcasesSet/>} />
            <Route path="/TestcaseDescription/:id" element={<TestcaseDescription/>}/>
            <Route path="/CreateTestcase/:id" element={<CreateTestcase/>}/>
            <Route path="/UpdateTestcase/:id1/:id" element={<UpdateTestcase/>}/>
            
            <Route path="/SubmissionsByPID/:id" element={<SubmissionsByPID/>} />
            <Route path="/SubmissionsByHandle" element={<SubmissionsByHandle/>} />
            <Route path="/Submissions/:filterField/:filterValue" element={<Submissions/>} />
            


          </Routes>
        </Router>
      // </AuthProvider>
    // </CookiesProvider>

  )
}

export default App;
