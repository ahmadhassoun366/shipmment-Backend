// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const postEmployeeController = require("../controllers/postEmployeeController");

router.post("/createEmployee", postEmployeeController.createPostEmployee);

// Route to retrieve all post employees
router.get("/getEmployees", postEmployeeController.getPostEmployees);

// Route to retrieve a single post employee by ID
router.get("/getEmployee/:id", postEmployeeController.getPostEmployeeById);

// Route to update an existing post employee
router.put("/updateEmployee/:id", postEmployeeController.updatePostEmployee);

// Route to delete a post employee
router.delete("/deleteEmployee/:id", postEmployeeController.deletePostEmployee);

module.exports = router;
