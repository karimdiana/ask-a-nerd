require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// API Routes
app.get('/api/user/profile/:id', (req, res) => {
    // Your profile logic here
    res.json({
        success: true,
        user: {
            name: 'Test User',
            email: 'test@example.com',
            categories: ['Technology', 'Business']
        }
    });
});

app.post('/api/user/categories/:id', (req, res) => {
    // Your categories update logic here
    res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});