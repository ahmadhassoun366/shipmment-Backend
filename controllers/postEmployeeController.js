const postEmployee = require("../models/postEmployee");

// Controller method to retrieve all post employees
async function getPostEmployees(req, res) {
  try {
    const employees = await PostEmployee.find();
    res.json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getPostEmployees,
};
