require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('../models/Message.js');

module.exports = async (req, res) => {
  try {
    if (!process.env.MONGO_URL) {
      return res.status(500).json({ error: 'MONGO_URL not set', success: false });
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    if (req.method === 'POST') {
      const newMessage = new Message(req.body);
      const savedMessage = await newMessage.save();
      res.setHeader('Cache-Control', 'no-store');
      res.status(201).json({ success: true, data: savedMessage });
    } else {
      res.setHeader('Cache-Control', 'no-store');
      res.status(405).json({ error: 'Method not allowed', success: false });
    }
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(400).json({ success: false, message: err.message });
  }
};
