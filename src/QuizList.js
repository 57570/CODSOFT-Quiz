import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './QuizList.css';

const   QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/quizzes');
                setQuizzes(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="quiz-list-container">
            <h2>Available Quizzes</h2>
            <ul className="quiz-list">
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
