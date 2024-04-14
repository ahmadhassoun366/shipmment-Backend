
const postEmployee = require('../models/postEmployee');

async function createPostEmployee(req, res) {
    try {
        const newEmployee = await postEmployee.create(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createPostEmployee,
};