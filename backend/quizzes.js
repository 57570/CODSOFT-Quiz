import express from 'express';
import Quiz from './quizModel.js';

const router = express.Router();

// Create a new quiz
router.post('/', async (req, res) => {
    const { title, questions } = req.body;
    if (!title || !questions || questions.length === 0) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (quiz == null) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
