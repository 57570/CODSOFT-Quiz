import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateQuiz.css';

const CreateQuiz = () => {
    const [quiz, setQuiz] = useState({ title: '', questions: [] });
    const [question, setQuestion] = useState({ questionText: '', options: '', correctAnswer: '' });
    const [isTitleSet, setIsTitleSet] = useState(false);
    const [isQuestionAdded, setIsQuestionAdded] = useState(false);
    const userDataString = localStorage.getItem('auth');
    const name = userDataString ? JSON.parse(userDataString).user.name : null;
    const handleTitleChange = (e) => {
        setQuiz({ ...quiz, title: e.target.value });
    };

    useEffect(() => {
        setIsQuestionAdded(quiz.questions.length > 0);
    }, [quiz.questions]);

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setQuestion({ ...question, [name]: value });
    };

    const addQuestion = () => {
        const newQuestion = {
            ...question,
            options: question.options.split(',').map(option => option.trim())
        };
        setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
        setQuestion({ questionText: '', options: '', correctAnswer: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (quiz.questions.length > 0) {
                await axios.post('http://localhost:8080/quizzes', quiz);
                toast.success('Quiz created successfully');
                // Reset the quiz creation state to start a new quiz if desired
                setQuiz({ title: '', questions: [] });
                setIsTitleSet(false);
                setIsQuestionAdded(false); // Reset to false after quiz creation
            } else {
                toast.error('Please add at least one question');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to create quiz');
        }
    };

    return (
        <div className="create-quiz">
            <h2>Create a New Quiz</h2>
            {!isTitleSet ? (
                <div>
                    <input
                        type="text"
                        placeholder="Quiz Title"
                        value={quiz.title}
                        onChange={handleTitleChange}
                    />
                    <button onClick={() => setIsTitleSet(true)}>Set Title</button>
                </div>
            ) : (
                <div>
                    <h3>{quiz.title}</h3>
                    <div>
                        <input
                            type="text"
                            placeholder="Question Text"
                            name="questionText"
                            value={question.questionText}
                            onChange={handleQuestionChange}
                        />
                        <input
                            type="text"
                            placeholder="Options (comma separated)"
                            name="options"
                            value={question.options}
                            onChange={handleQuestionChange}
                        />
                        <input
                            type="text"
                            placeholder="Correct Answer"
                            name="correctAnswer"
                            value={question.correctAnswer}
                            onChange={handleQuestionChange}

                        />
                        <button type="button" onClick={addQuestion}>Add Question</button>
                    </div>
                    {isQuestionAdded && (
                        <button type="button" onClick={handleSubmit}>Create Quiz</button>
                    )}
                    <h4>Added Questions</h4>
                    <ul>
                        {quiz.questions.map((q, index) => (
                            <li key={index}>
                                <strong>{q.questionText}</strong>
                                <ul>
                                    {q.options.map((option, i) => (
                                        <li key={i}>{option}</li>
                                    ))}
                                </ul>
                                <p>Correct Answer: {q.correctAnswer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default CreateQuiz;
