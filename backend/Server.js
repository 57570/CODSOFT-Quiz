import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './quizzes.js';
import connectDb from './Db.js';
import { loginController, registerController } from './AuthController.js';

dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use('/quizzes', quizRoutes);
app.use('/login',loginController)
app.use('/register',registerController)
connectDb()
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
