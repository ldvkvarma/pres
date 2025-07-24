const express = require('express');
const cors = require('cors'); // Add this line
const app = express();
app.use(cors()); // Add this line
app.use(express.json());

const PASSWORD = 'tes2025';
app.get('C:\Users\ldvkv\Downloads\Presentation_02\index.html', (req, res) => {
  res.send('API is running. Use POST /api/auth for authentication.');
});
app.post('/api/auth', (req, res) => { // Fix route path
  const { password } = req.body;
  if (password === PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});