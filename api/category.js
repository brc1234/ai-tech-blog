import mongoose from 'mongoose';
import Post from '../models/Post.js';

export default async (req, res) => {
  try {
    if (!process.env.MONGO_URL) {
      return res.status(500).json({ error: 'MONGO_URL not set' });
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};