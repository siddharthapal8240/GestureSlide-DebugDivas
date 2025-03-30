import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import uploadRoutes from './routes/upload.js';
import { spawn } from 'child_process';

dotenv.config();

// Log environment variables to verify they are loaded
console.log('Environment variables:', {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary at startup
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api', uploadRoutes);

// Spawn main.py
const pythonProcess = spawn('python', ['service/main.py'], {
  cwd: process.cwd(),
  stdio: 'inherit', // Share stdout/stderr with Node.js
});

pythonProcess.on('error', (err) => {
  console.error('Failed to start main.py:', err);
});

pythonProcess.on('exit', (code) => {
  console.log(`main.py exited with code ${code}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));