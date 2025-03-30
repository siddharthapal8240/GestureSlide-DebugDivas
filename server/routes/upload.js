import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import Presentation from '../models/Presentation.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const router = express.Router();

// Configure Multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'presentations',
    resource_type: 'raw',
    allowed_formats: ['pdf'],
  },
});

const upload = multer({ storage });

// Upload endpoint (only uploads and saves to MongoDB)
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    console.log('Upload request received');
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('File uploaded to Cloudinary:', req.file.path);

    const presentation = new Presentation({
      pdfUrl: req.file.path,
    });
    console.log('Saving to MongoDB...');
    await presentation.save();
    console.log('Saved to MongoDB');

    res.status(200).json({
      message: 'PDF uploaded successfully',
      pdfUrl: req.file.path,
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start presentation endpoint (runs main.py)
router.post('/start', async (req, res) => {
  const { pdfUrl } = req.body;
  if (!pdfUrl) {
    return res.status(400).json({ message: 'No PDF URL provided' });
  }

  try {
    console.log('Starting Python script with URL:', pdfUrl);
    const { stdout, stderr } = await execPromise(
      `/Users/sid/Developer/Binary/server/.venv/bin/python3 service/main.py "${pdfUrl}"`
    );
    console.log('Python output:', stdout);
    if (stderr) console.error('Python error:', stderr);
    res.status(200).json({ message: 'Presentation started' });
  } catch (error) {
    console.error('Error running Python script:', error);
    res.status(500).json({ message: 'Error starting presentation', error: error.message });
  }
});

export default router;