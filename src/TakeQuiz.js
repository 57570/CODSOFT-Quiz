import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './TakeQuiz.css';

const TakeQuiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/quizzes/${id}`);
                setQuiz(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleAnswerChange = (e) => {
        setAnswers({ ...answers, [currentQuestionIndex]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let correctAnswers = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
    };

    if (!quiz) {
        return <div className="loading">Loading...</div>;
    }

    if (score !== null) {
        return (
            <div className="quiz-results">
                <h2>Quiz Results</h2>
                <p>Your score: {score} / {quiz.questions.length}</p>
                <button onClick={() => navigate('/quizzes')}>Back to Quizzes</button>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="take-quiz">
            <h2 className="quiz-title">{quiz.title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="question-container">
                    <p className="question-text">{currentQuestion.questionText}</p>
                    <div className="options-container">
                        {currentQuestion.options.map((option, index) => (
                            <label key={index} className="option">
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={answers[currentQuestionIndex] === option}
                                    onChange={handleAnswerChange}
                                />
                                <span className="option-text">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="navigation-buttons">
                    <button
                        type="button"
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                        disabled={currentQuestionIndex === 0}
                        className="nav-button"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                        disabled={currentQuestionIndex === quiz.questions.length - 1}
                        className="nav-button"
                    >
                        Next
                    </button>
                </div>
                <button type="submit" className="submit-button" disabled={Object.keys(answers).length < quiz.questions.length}>
                    Submit Quiz
                </button>
            </form>
        </div>
    );
};

export default TakeQuiz;
