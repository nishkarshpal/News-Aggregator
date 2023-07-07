// File: server.js
const express = require('express');
const app = express();
const usersRouter = require('./src/users');
const preferencesRouter = require('./src/preferences');
const newsRouter = require('./src/news');

app.use(express.json());

// Routes
app.use('/users', usersRouter);
app.use('/preferences', preferencesRouter);
app.use('/news', newsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
