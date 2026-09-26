const express = require('express');
const mysql = require('mysql2');  // ← NEW

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '12345',
  database: process.env.DB_NAME || 'my_database'
});

// Connect to database (NEW)
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Route: Home
app.get('/', (req, res) => {
  res.send('Welcome to My Backend Server!');
});

// Route: API Example
app.get('/api/user', (req, res) => {
  res.json({ name: "John Doe", email: "john@example.com" });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!email.includes('@')) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) throw err;
    res.json({
      message: `Thank you ${name}, your message has been saved!`,
      data: { id: result.insertId, name, email, message }
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});