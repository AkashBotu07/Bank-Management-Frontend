import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRouter';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Route (Has NavbarUser inside) */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Protected Admin Route (Shows Navbar with links) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <>
                <AdminDashboard />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
