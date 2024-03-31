const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.getUsersForTransactions = async (req, res) => {
    try {
        const users = await userService.getForTransations();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
}