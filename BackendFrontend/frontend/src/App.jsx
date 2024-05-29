import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CookiesProvider } from 'universal-cookie';
// import { AuthProvider } from './AuthContext';
// import Login from './Components/Login';
// import Register from './Components/Register';
import RegisterPage from './Components/RegisterPage';
import Homepage from './Components/Homepage';
import ProblemSet from './Components/ProblemSet';
import ProblemDescription from './Components/ProblemDescription';
import UpdateProblem from './Components/UpdateProblem';
import CreateProblem from './Components/CreateProblem';
import TestcasesSet from './Components/TestcasesSet';
import TestcaseDescription from './Components/TestcaseDescription';
import CreateTestcase from './Components/CreateTestcase';
import UpdateTestcase from './Components/UpdateTestcase';

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <CookiesProvider>
      // <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/homepage" element={<Homepage />} />

            <Route path="/ProblemSet" element={<ProblemSet />} />
            <Route path="/ProblemDescription/:id" element={<ProblemDescription/>}/>
            <Route path="/CreateProblem" element={<CreateProblem/>}/>
            
            <Route path="/UpdateProblem/:id" element={<UpdateProblem/>}/>
            <Route path="/TestcasesSet/:id" element={<TestcasesSet/>} />
            <Route path="/TestcaseDescription/:id" element={<TestcaseDescription/>}/>
            <Route path="/CreateTestcase/:id" element={<CreateTestcase/>}/>
            <Route path="/UpdateTestcase/:id1/:id" element={<UpdateTestcase/>}/>
          </Routes>
        </Router>
      // </AuthProvider>
    // </CookiesProvider>

  )
}

export default App;
