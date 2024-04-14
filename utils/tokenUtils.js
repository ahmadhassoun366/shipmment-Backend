// utils/tokenUtils.js
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        type: user.type // Include the account type in the token payload
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = generateToken;
