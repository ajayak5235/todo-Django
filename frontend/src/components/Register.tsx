import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import './Login.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                password
            });
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Register</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="login-input"
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="login-input"
            />
            <button onClick={handleRegister} className="login-button">Register</button>
            <p className="register-link">
                Have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
};

export default Register;
