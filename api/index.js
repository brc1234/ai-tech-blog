const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('../models/Post.js');
const Message = require('../models/Message.js');

dotenv.config();

const MONGO_URL = (process.env.MONGO_URL || '').trim().replace(/^['"]|['"]$/g, '');

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(MONGO_URL)


app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});


app.post('/api/contact', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json({ success: true, data: savedMessage });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = app;