// server.js
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const PASSWORD = process.env.ADMIN_PASSWORD;

app.post('/api/auth', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
