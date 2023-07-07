// File: src/preferences.js
const express = require('express');
const router = express.Router();

// In-memory data store
const preferences = {};

// Retrieve news preferences for the logged-in user
router.get('/', (req, res, next) => {
  try {
    const { user } = req;
    const userPreferences = preferences[user.username] || {};

    res.status(200).json(userPreferences);
  } catch (error) {
    next(error);
  }
});

// Update news preferences for the logged-in user
router.put('/', (req, res, next) => {
  try {
    const { user, body } = req;
    preferences[user.username] = body;

    res.status(200).json({ message: 'Preferences updated successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
