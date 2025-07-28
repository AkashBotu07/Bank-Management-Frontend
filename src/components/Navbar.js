import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();


  return (
    <nav className="navbar">
      <h2>Bank Info System</h2>
      <div>
        <Link to="/user">User Dashboard</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </div>
    </nav>
  );
}
