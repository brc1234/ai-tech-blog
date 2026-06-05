const mongoose = require('mongoose');
const Post = require('../models/Post.js');

const parseMongoUrlInfo = (uri) => {
  if (!uri) return null;
  try {
    const safeUri = uri.replace(/\/\/([^:\/]+)(:[^@]*)?@/, '//<redacted>@');
    const url = new URL(safeUri);
    const database = url.pathname ? url.pathname.replace(/^\/+/, '') : null;
    return {
      host: url.host,
      database: database || null,
    };
  } catch (err) {
    const match = uri.match(/\/\/[^@]+@([^/]+)\/([^?]+)/);
    if (match) {
      return { host: match[1], database: match[2] };
    }
    return { host: 'unknown', database: 'unknown' };
  }
};

module.exports = async (req, res) => {
  try {
    const envSet = !!process.env.MONGO_URL;
    if (mongoose.connection.readyState === 0 && envSet) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const count = await Post.countDocuments();
    const uriInfo = envSet ? parseMongoUrlInfo(process.env.MONGO_URL) : null;

    res.setHeader('Cache-Control', 'no-store');
    res.json({
      success: true,
      count,
      readyState: mongoose.connection.readyState,
      envSet,
      mongoInfo: uriInfo,
    });
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(500).json({ success: false, message: err.message });
  }
};
