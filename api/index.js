import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Post from '../models/Post.js';
import Message from '../models/Message.js';

const app = express();

app.use(cors());
app.use(express.json());

// Vercel'de Environment Variable'ı doğrudan kullanıyoruz
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Atlas bağlantısı başarılı!'))
    .catch(err => console.error('Bağlantı hatası:', err));

// Rotalar (Önek yok, vercel.json halledecek)
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.post('/contact', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json({ success: true, data: savedMessage });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

export default app;