require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PASSWORD = process.env.ADMIN_PASSWORD;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('https://pres-2.onrender.com/api/auth', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
