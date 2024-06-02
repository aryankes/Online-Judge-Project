// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
// const secret = process.env.SECRET_KEY; 
// // const auth_page(permissions) => {

// // }
// const auth = (permissions,req, res, next) => {
//     // Get token from cookies
//     const token = req.cookies.token;
//     // Check if not token
//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }
//     // Verify token
//     try {
//         const decoded = jwt.verify(token, secret);
//         req.user = decoded.user;
//         if(permissions.includes(req.user.role)){
//             next();
//         }
//         else{
//             return res.status(401).json({ message: "You Don't have authorization to access this page" });
//         }
//     } 
//     catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// module.exports = auth;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.SECRET_KEY;

const auth = (permissions) => {
    return (req, res, next) => {
        // Get token from cookies
        const token = req.signedCookies.token.jwtToken;

        // Check if not token
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, secret);
            req.user = decoded;

            // Check if the user's role is authorized
            if (permissions.includes(req.user.role)) {
                next();
            } else {
                return res.status(403).json({ message: `You don't have authorization to access this page ` });
            }
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

module.exports = auth;
