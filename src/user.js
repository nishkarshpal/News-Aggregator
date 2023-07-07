// File: src/users.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// In-memory data store
const users = [];

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = {
      username,
      password: hashedPassword
    };

    // Store the user in the data store
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
});

// Log in a user
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, 'secret');

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
