import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Post from '../models/Post.js';
import Message from '../models/Message.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Atlas bağlantısı başarılı!'))
    .catch(err => console.error('Bağlantı hatası:', err));


app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/category', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
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

export default app;