const jwt = require('jsonwebtoken');

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);  // Log the authorization header for debugging

    // Extract token from the Authorization header (expected format: "Bearer <token>")
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    // Verify the token with the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err);  // Log error for debugging
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        console.log('Decoded JWT:', user);  // Log the decoded payload (remove in production)

        req.user = user;  // Attach the decoded user info to the request object
        next();  // Proceed to the next middleware or route handler
    });
};

// Middleware to authorize a user's role
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            console.log(`Access denied for role: ${req.user.role}`);  // Log denied access attempt
            return res.status(403).json({ message: 'Access denied' });
        }
        next();  // Proceed to the next middleware or route handler
    };
};

module.exports = { authenticateToken, authorizeRole };
