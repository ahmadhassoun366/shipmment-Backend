// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const postEmployeeController = require("../controllers/postEmployeeController");

router.post("/createPostEmployee", postEmployeeController.createPostEmployee);

// Route to retrieve all post employees
router.get("/postEmployees", postEmployeeController.getPostEmployees);

// Route to retrieve a single post employee by ID
router.get("/postEmployees/:id", postEmployeeController.getPostEmployeeById);

// Route to update an existing post employee
router.put("/postEmployees/:id", postEmployeeController.updatePostEmployee);

// Route to delete a post employee
router.delete("/postEmployees/:id", postEmployeeController.deletePostEmployee);

module.exports = router;
