// middleware/auth.js
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const auth = (role) => {
    return (req, res, next) => {
        // Extract token from the cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            // Check for required role, if specified
            if (role && req.user.role !== role) {
                return res.status(403).send('Access denied. You do not have the required role.');
            }

            next();
        } catch (error) {
            res.status(400).send('Invalid token.');
        }
    };
};

module.exports = auth;