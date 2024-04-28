// middleware/checkRole.js
function checkRole(role) {
    return (req, res, next) => {
        // Check if user information exists in the request object
        if (!req.user) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Check if the user's role matches the required role
        if (req.user.type === role) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    };
}

module.exports = checkRole;
