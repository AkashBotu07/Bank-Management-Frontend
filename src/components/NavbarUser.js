import { useNavigate } from 'react-router-dom';

export default function NavbarUser() {
  const navigate = useNavigate();

  const logout = () => {
  localStorage.clear();
  window.location.href = '/#/login';
};



  return (
    <nav className="navbarUser">
      <h2>Bank Info System</h2>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
