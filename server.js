require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PASSWORD = process.env.ADMIN_PASSWORD;

app.use(express.json());

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Auth API route
app.post('/api/auth', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

// Catch-all route: send index.html for all other paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
