import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: 'Yapay Zeka' },
    imageUrl: { type: String },
    readTime: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', PostSchema);