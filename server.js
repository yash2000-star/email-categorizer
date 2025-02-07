require('dotenv').config();
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/auth', authRoutes);

// Import and use routes
const emailRoutes = require('./routes/emailRoutes');
app.use('/api/emails', emailRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Gmail Categorizer is running!');
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});