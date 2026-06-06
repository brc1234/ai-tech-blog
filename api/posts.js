require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/Post.js');

const MONGO_URL = (process.env.MONGO_URL || '').trim().replace(/^['"]|['"]$/g, '');

module.exports = async (req, res) => {
  try {
    if (!MONGO_URL) {
      return res.status(500).json({ error: 'MONGO_URL not set' });
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URL);
    }

    if (req.method === 'GET') {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.setHeader('Cache-Control', 'no-store');
      res.json(posts);
    } else if (req.method === 'POST') {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.setHeader('Cache-Control', 'no-store');
      res.status(201).json(savedPost);
    } else {
      res.setHeader('Cache-Control', 'no-store');
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
