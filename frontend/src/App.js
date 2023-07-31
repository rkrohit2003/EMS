import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landingPage/LandingPage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { UserEmailProvider } from './UserEmailContext';
import { Home } from './components/common/Home'
import { ListEmployee } from './components/manager/ListEmployee'
import NavBar from './components/common/NavBar'
import SideBar from './components/manager/SideBar'
import EmployeeSideBar from './components/employee/EmployeeSideBar'
import AddEmployee from './components/manager/AddEmployee';
import AssignTask from './components/manager/AssignTask';
import AddNotification from './components/manager/AddNotification';
import { ListTask } from './components/manager/ListTask';
import { LeaveRequest } from './components/manager/LeaveRequest';
import Profile from './components/common/Profile';
import { EmployeeTask } from './components/employee/EmployeeTask';
import RequestLeave from './components/employee/RequestLeave';
import { RequestedLeave } from './components/employee/RequestedLeave';
import { ManagerNotification } from './components/manager/ManagerNotification';
import { EmployeeNotification } from './components/employee/EmployeeNotification';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);
  useEffect(() => {
    const storedLog = localStorage.getItem('isLoggedIn');
    const storedManager = localStorage.getItem('isManager');
    if (storedLog && storedLog !== '') {
      setIsLoggedIn(true);
    }
    if (storedManager === 'true') {
      setIsManager(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <UserEmailProvider>
        {isManager ? (
          <>
            <NavBar setIsManager={setIsManager} setIsLoggedIn={setIsLoggedIn} />
            <SideBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listEmployee" element={<ListEmployee />} />
              <Route path="/addEmployee" element={<AddEmployee />} />
              <Route path="/addNotification" element={<AddNotification />} />
              <Route path="/notification" element={<ManagerNotification />} />
              <Route path="/assignTask" element={<AssignTask />} />
              <Route path="/listTask" element={<ListTask />} />
              <Route path="/leaveRequest" element={<LeaveRequest />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </>
        ) : isLoggedIn ? (
          <>
            <NavBar setIsManager={setIsManager} setIsLoggedIn={setIsLoggedIn} />
            <EmployeeSideBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listTask" element={<EmployeeTask />} />
              <Route path="/requestLeave" element={<RequestLeave />} />
              <Route path="/requestedLeave" element={<RequestedLeave />} />
              <Route path="/notification" element={<EmployeeNotification />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/login' element={<LoginPage setIsLoggedIn={setIsLoggedIn} setIsManager={setIsManager} />}></Route>
          </Routes>
        )}
      </UserEmailProvider>
    </BrowserRouter>
  );
}

export default App;
