// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const userDataString = localStorage.getItem('auth');
    const name = userDataString ? JSON.parse(userDataString).user.name : null;
    return (
        <div className="home-container">
            <div className="banner">
                <h1>Welcome to Quiz Portal</h1>
            </div>
            <div className="home-content">
                {userDataString ?  <Link to="/create-quiz" className="button">Create a Quiz</Link>  : <Link to="/login" className="button">Create a Quiz</Link>}
                {userDataString ? <Link to="/quizzes" className="button">Take a Quiz</Link> : <Link to="/login" className="button">Take a Quiz</Link>}
                {/* {userDataString ?  <Link to="/create-quiz" className="button">Create a Quiz</Link>  : <Link to="/login" className="button">Create a Quiz</Link>} */}
            
            </div>
        </div>
    );
};

export default Home;
