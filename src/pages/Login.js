import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';



export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAdmin', res.data.isAdmin);
      navigate(res.data.isAdmin ? '/admin' : '/user');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (

    <div>
      <Navbar/>
    <form onSubmit={handleSubmit} className="form">
      <h2>Login</h2> <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
    </div>
  );
}
