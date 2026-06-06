import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axiosInstance';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token, role, user_id, first_name, last_name, email, username: uname } = response.data;

      const userData = { user_id, first_name, last_name, email, username: uname };
      login(token, role, userData);
      setError(null);
      toast.success('Login successful');

      // Redirect based on role
      window.setTimeout(() => {
        if (role.toLowerCase() === 'admin') navigate('/admin');
        else if (role.toLowerCase() === 'manager') navigate('/manager/officers');
        else if (role.toLowerCase() === 'vendor') navigate('/vendor');
        else if (role.toLowerCase() === 'procurement') navigate('/procurement');
        else navigate('/');
      }, 400);

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-brand-panel">
          <Link className="login-brand" to="/">
            <span className="login-brand-mark">VB</span>
            <span className="login-brand-name">VendorBridge</span>
          </Link>

          <h1>Sign in to continue the procurement flow.</h1>
        </div>

        <div className="login-card">
          <div className="login-card-top">
            <p className="login-eyebrow">Welcome back</p>
            <h2>Login</h2>
            <p className="login-subtitle">Enter your username and password to continue.</p>
          </div>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleLogin} className="login-form">
            <label>
              <span>Username</span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="login-button">Login</button>
            <Link className="login-link-button" to="/signup">
              Register as Vendor
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
