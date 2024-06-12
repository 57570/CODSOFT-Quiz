// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import CreateQuiz from './CreateQuiz.js';
import Quizzes from './QuizList.js';
import Login from './Login.jsx';
// import Signup from './Signup';
import './App.css';
import QuizList from './QuizList.js';
import TakeQuiz from './TakeQuiz.js';
import { AuthProvider } from './authContext.js';
import Register from './Signup.js';

const App = () => {
    return (
        <AuthProvider>
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-quiz" element={<CreateQuiz />} />
                    <Route path="/quizzes" element={<QuizList />} />
                    <Route path="/quiz/:id" element={<TakeQuiz />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                </Routes>
            </div>
        </Router>
        </AuthProvider>
    );
};

export default App;
