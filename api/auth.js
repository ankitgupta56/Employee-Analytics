import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../backend/src/config/db.js';
import authRoutes from '../backend/src/routes/authRoutes.js';
import employeeRoutes from '../backend/src/routes/employeeRoutes.js';
import aiRoutes from '../backend/src/routes/aiRoutes.js';
import { notFound, errorHandler } from '../backend/src/middleware/errorMiddleware.js';

dotenv.config();

const app = express();

connectDB();

const corsOptions = {
  origin: ['https://ese.vercel.app', 'http://localhost:3001'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use(notFound);
app.use(errorHandler);

export default app;
