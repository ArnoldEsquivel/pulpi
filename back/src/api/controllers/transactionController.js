const transactionService = require('../services/transactionService');

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAll();
        res.json(transactions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.create(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
