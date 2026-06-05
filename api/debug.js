const mongoose = require('mongoose');
const Post = require('../models/Post.js');

module.exports = async (req, res) => {
  try {
    const envSet = !!process.env.MONGO_URL;
    if (mongoose.connection.readyState === 0 && envSet) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const count = await Post.countDocuments();
    res.setHeader('Cache-Control', 'no-store');
    res.json({ success: true, count, readyState: mongoose.connection.readyState, envSet });
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(500).json({ success: false, message: err.message });
  }
};
