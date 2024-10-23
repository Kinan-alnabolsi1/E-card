import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ChangeEmail from './components/ChangeEmail';
import ChangePassword from './components/ChangePassword'
import OtpEmail from './components/OtpEmail';
import LoginL from './components/LoginL';
import PersonalL from './components/PersonalL';
import Preview from './pages/Preview';
import NewEmail from './components/NewEmail'


function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<LoginL/>} />
          <Route path="/personal" element={<PersonalL/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/preview" element={<Preview/>} />
          <Route path="/changeemail" element={<ChangeEmail/>} />
          <Route path="/changepassword" element={<ChangePassword/>} />
          <Route path="/otpemail" element={<OtpEmail/>} />
          <Route path="/newemail" element={<NewEmail/>} />
          
          {/* <Route path="/test" element={<Test/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
