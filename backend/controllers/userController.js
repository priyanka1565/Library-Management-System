const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token with role
// Generate JWT token with role
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, password, role });
        return res.status(201).json({ message: 'User registered successfully', data: [] });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(400).json({ message: 'Registration failed', error: error.message });
    }
};
// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`No user found with email: ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Password did not match for user: ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user._id, user.role);
        return res.json({ token, message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
};


// Get user profile (example of protected route)
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ message: 'Could not fetch user profile' });
    }
};
