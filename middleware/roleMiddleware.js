// middleware/roleMiddleware.js
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id); // Assumes req.user is populated by authentication middleware
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied: Admins only' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Authorization error' });
  }
};

module.exports = verifyAdmin;
