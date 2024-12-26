// routes/apiRoutes.js
const express = require('express');
const axios = require('axios');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { transformRequestResponse } = require('../middleware/transform');
const { getCache, setCache } = require('../utils/cache');
const { getNextBackendServer } = require('../utils/loadBalancer');
const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 
const router = express.Router();
const BACKEND_SERVERS = process.env.BACKEND_SERVERS;

router.use(transformRequestResponse);

router.post('/login', (req, res) => {
    const { username, role } = req.body;
    if (!username || !role) return res.status(400).json({ message: 'Username and role are required' });

    const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Assuming getNextBackendServer is fixed to handle the server list properly
router.get('/data', authenticateToken, authorizeRole(['Admin', 'Editor']), async (req, res) => {
    const cachedData = getCache('data');
    if (cachedData) {
        return res.json(cachedData);
    }

    // Check if we are in a testing environment or want to return dummy data
    const useDummyData = process.env.USE_DUMMY_DATA === 'true'; // Set this flag for testing

    if (useDummyData) {
        // Dummy data for testing
        const dummyData = {
            message: "This is a test response",
            data: [
                { id: 1, name: "Item 1", description: "This is item 1" },
                { id: 2, name: "Item 2", description: "This is item 2" },
                { id: 3, name: "Item 3", description: "This is item 3" }
            ]
        };

        console.log('Returning dummy data:', dummyData); // Log the dummy data
        setCache('data', dummyData); // Cache the dummy data
        return res.json(dummyData); // Send the dummy data as the response
    }

    // Fetch data from the backend server
    try {
        // Split BACKEND_SERVERS into an array of servers
        const backendServers = process.env.BACKEND_SERVERS.split(',').map(server => server.trim());
        
        console.log('Available backend servers:', backendServers); // Log available backend servers

        // Get the next available backend server (for simplicity, use the first one in the list)
        const backendServer = backendServers[0]; // Or implement a load balancing strategy

        console.log('Backend server selected:', backendServer); // Log the selected backend server

        if (!backendServer) {
            return res.status(500).json({ message: 'No available backend servers' });
        }

        // Form the request URL
        const requestUrl = `${backendServer}/data`;
        console.log('Requesting data from backend URL:', requestUrl); // Log the final request URL

        // Fetch data from the backend server
        const response = await axios.get(requestUrl);

        console.log('Backend response:', response.data); // Log the backend response

        setCache('data', response.data); // Cache the response data
        return res.json(response.data); // Send the backend data as the response
    } catch (error) {
        console.error('Error fetching data from backend:', error); // Log the error
        return res.status(500).json({ message: 'Error fetching data from backend' }); // Send error response
    }
});




router.post('/admin', authenticateToken, authorizeRole(['Admin']), (req, res) => {
    res.json({ message: 'Admin route accessed successfully' });
});

module.exports = router;