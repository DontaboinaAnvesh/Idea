import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Login.css'; // For styling
import lightbulbGif from '../Images/idea-lightbulb.gif'; // Corrected path for the GIF

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const isAuthenticated = await login(email, password);
    setLoading(false); // Stop loading after authentication

    if (isAuthenticated) {
      navigate('/home'); // Redirect to home page on successful login
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit" disabled={loading}>Login</button>
      </form>
      
      {loading && (
        <div className="loading-animation">
          <img src={lightbulbGif} alt="Loading..." /> {/* Use imported GIF */}
        </div>
      )}

      <p>
        Don't have an account? 
        <span onClick={() => navigate('/signup')} className="link">Signup</span>
      </p>
    </div>
  );
};

export default Login;
