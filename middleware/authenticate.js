const jwt = require('jsonwebtoken');
const Account = require('../models/account');

async function authenticate(req, res, next) {
    // Check if the authorization header is present and correctly formatted
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or invalid token format' });
    }

    try {
        // Get token from request headers
        const token = req.headers.authorization.split(' ')[1]; // Splitting 'Bearer <token>'

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user in the database based on the decoded token
        const user = await Account.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user information to the request object
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: ' + error.message });
    }
}

module.exports = authenticate;
