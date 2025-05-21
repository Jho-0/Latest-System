//App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/Loginpage";
import { useAuth } from "./context/Authcontext";
import DashboardPage from "./pages/DashboardPage";
import LogsPage from "./pages/LogsPage";
import ReportPage from "./pages/ReportPage";
import ManageUser from "./pages/ManageUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import AppointmentPage from "./pages/AppointmentPage";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";

const PrivateRoute = ({ element }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      logout();
      navigate("/", { replace: true });
    }
    if (user && location.pathname === "/") {
      logout();
      navigate("/", { replace: true });
    }
  }, [user, location, navigate, logout]);

  return user ? element : null;
};


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ReceptionistDashboard />} />
          <Route path="/dashboard-admin" element={<PrivateRoute element={<DashboardPage />} />} />
          <Route path="/monitor-visitor-logs" element={<PrivateRoute element={<LogsPage />} />} />
          <Route path="/generate-report" element={<PrivateRoute element={<ReportPage />} />} />
          <Route path="/manageuser-admin" element={<PrivateRoute element={<ManageUser />} />} />
          <Route path="/receptionist-user" element={<PrivateRoute element={<ReceptionistDashboard />} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;