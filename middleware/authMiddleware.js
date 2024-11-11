// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded.user; // Attach the user info to the request object
    next(); // Call the next middleware (controller)
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
