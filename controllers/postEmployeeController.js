
const postEmployee = require('../models/postEmployee');

async function createPostEmployee(req, res) {
    try {
        const newEmployee = await postEmployee.create(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to retrieve all post employees
async function getPostEmployees(req, res) {
    try {
        const employees = await PostEmployee.find();
        res.json(employees);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to retrieve a single post employee by ID
async function getPostEmployeeById(req, res) {
    const employeeId = req.params.id;
    try {
        const employee = await PostEmployee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Post employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to update an existing post employee
async function updatePostEmployee(req, res) {
    const employeeId = req.params.id;
    try {
        const updatedEmployee = await PostEmployee.findByIdAndUpdate(employeeId, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Post employee not found' });
        }
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to delete a post employee
async function deletePostEmployee(req, res) {
    const employeeId = req.params.id;
    try {
        const deletedEmployee = await PostEmployee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Post employee not found' });
        }
        res.json({ message: 'Post employee deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createPostEmployee,
    getPostEmployees,
    getPostEmployeeById,
    updatePostEmployee,
    deletePostEmployee
};