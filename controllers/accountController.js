// controllers/accountController.js
const Account = require("../models/account");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/tokenUtils");

// Controller method for user signup (create account)
async function signup(req, res) {
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new account with hashed password
    const newAccount = await Account.create({
      ...req.body,
      password: hashedPassword,
    });

    // Respond with the created account
    res.status(201).json(newAccount);
  } catch (error) {
    // Handle any errors
    res.status(400).json({ message: error.message });
  }
}
async function signin(req, res) {
  try {
    // Verify user's credentials
    const { email, password } = req.body;
    const user = await Account.findOne({ email });

    console.log("User:", user); // Log the user object

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Respond with the JWT token and account type
    res.json({ token, type: user.type });
  } catch (error) {
    // Handle any errors
    res.status(400).json({ message: error.message });
  }
}
async function logout(req, res) {
  try {
    // Get token from request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Here, you might implement token invalidation strategy.
    // For simplicity, let's assume the token is just expired.

    // Respond with success message
    res.json({ message: "Logout successful" });
  } catch (error) {
    // Handle any errors
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  signup,
  signin,
  logout,
  // Export other controller methods here
};
