import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 

const Navbar: React.FC = () => (
    <div className='Navbar'>
        <div>
            <h2>Welcome to Todo App</h2>
        </div>
        <div style={{ display: 'flex' }}>
            <h4 style={{ marginLeft: "10px" }}>Home</h4>
            <h4 style={{ marginLeft: "10px" }}>Contact Us</h4>
            <button className='logout-button'><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Logout</Link></button>
        </div>
    </div>
);

export default Navbar;
