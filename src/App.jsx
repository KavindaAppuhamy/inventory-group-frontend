import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Auth Pages
import ForgotPassword from './pages/ForgotPassword';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Admin Pages
import AdminDashboard from './pages/admin/adminDashboard';
import EmployeeCreate from './pages/adminDashboardPages/employeeCreate';
import ManageEmployee from './pages/adminDashboardPages/manageEmployee';
import AdminPage from './pages/adminPage';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Auth Routes */}
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/forgot' element={<ForgotPassword />} />

        {/* Admin Dashboard Routes */}
        <Route path="/dashboard" element={<AdminDashboard />}>
          <Route index element={<div>Welcome to Employee Management</div>} />
          <Route path="admin/*" element={<AdminPage />} /> 
          <Route path="employee-manage" element={<ManageEmployee />} />
          <Route path="employee-create" element={<EmployeeCreate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;