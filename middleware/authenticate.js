// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const Account = require('../models/account');

async function authenticate(req, res, next) {
    try {
        // Get token from request headers
        const token = req.headers.authorization.split(' ')[1];

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user in the database based on the decoded token
        const user = await Account.findById(decoded.id);

        if (!user) {
            throw new Error('User not found');
        }

        // Attach user information to the request object
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authenticate;
