const express = require('express');
// const mysql = require('mysql2'); // Commented out for deployment

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection commented out for Render deployment
/*
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'my_database'
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});
*/

app.use(express.json());

// Route: Home
app.get('/', (req, res) => {
  res.send('Welcome to My Backend Server!');
});

// Route: API Example
app.get('/api/user', (req, res) => {
  res.json({ name: "John Doe", email: "john@example.com" });
});

// Route: Contact (without database for cloud)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!email.includes('@')) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  
  res.json({
    message: `Thank you ${name}, we received your message!`,
    data: { name, email, message }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});