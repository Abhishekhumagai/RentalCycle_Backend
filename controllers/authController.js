const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User  = require('../models/User');  // Import User model

// // CHALNE CODE
// exports.register = async (req, res) => {
//   const { username, email, password , phoneNumber, dob, gender,address} = req.body;

//   try {

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ username, email, password: hashedPassword,phoneNumber,dob,gender,address });

//     res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// Register a new user
exports.register = async (req, res) => {
  const { username, email, password , phoneNumber, dob, gender,address,role} = req.body;

  try {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword,phoneNumber,dob,gender,address,role:role||"user"});

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { email: user.email, username: user.username ,role:user.role} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};