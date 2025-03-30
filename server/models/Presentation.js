import mongoose from 'mongoose';

const presentationSchema = new mongoose.Schema({
  pdfUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Presentation', presentationSchema);