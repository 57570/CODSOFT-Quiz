import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const userDataString = localStorage.getItem('auth');
    const name = userDataString ? JSON.parse(userDataString).user.name : null;
    
    const handleLogout = () => {
        localStorage.removeItem('auth');
        window.location.href = '/login';
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">Quiz Portal</Link>
            </div>
            <div className="navbar-center">
                <Link to="/quizzes" className="navbar-button">All Quizzes</Link>
            </div>
            <div className='navbar-right'>
                {userDataString ? (
                    <>
                        <span className='user-name'>{name}</span>
                        <button className='logout' onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className='login' to="/login">Login</Link>
                        <Link className='signup' to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;