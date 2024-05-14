// controllers/accountController.js
const Account = require("../models/account");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/tokenUtils");
const { createWarehouse } = require("../controllers/warehouseController");

async function signup(req, res) {
  try {
      const { name, email, password, type } = req.body;

      // Check if the email already exists
      if (await Account.findOne({ email })) {
          return res.status(409).json({ message: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAccount = new Account({
          name,
          email,
          password: hashedPassword,
          type,
      });

      // Save the new account
      const savedAccount = await newAccount.save();

      // Additional actions based on the type of account
      if (type === "Employee") {
          try {
              // Attempt to create a warehouse associated with this employee
              await createWarehouse(savedAccount._id);
          } catch (warehouseError) {
              console.error('Error creating warehouse for user:', savedAccount._id, warehouseError);
              return res.status(500).json({ message: "Failed to create warehouse for user." });
          }
      }

      // Respond with success, note no token is sent
      res.status(201).json({
          message: "Signup successful",
          user: {
              id: savedAccount._id,
              name: savedAccount.name,
              email: savedAccount.email,
              type: savedAccount.type,
          },
      });
  } catch (error) {
      // Handle any potential errors during the signup process
      res.status(500).json({ message: "Signup failed: " + error.message });
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
    res.json({ token, type: user.type , id : user._id});
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
