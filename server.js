// server.js File
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/apiRoutes');
const { limiter } = require('./middleware/rateLimiter');
const cors = require('cors');

require('dotenv').config(); 

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(limiter);
app.use(cors());
// Routes
app.use('/api', apiRoutes);

// Fallback Route
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});