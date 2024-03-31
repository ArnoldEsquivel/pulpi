const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { validateTransaction } = require('../../middleware/pipes/createTransaction');

router.get('/', transactionController.getAllTransactions);
router.get('/users', transactionController.getAllTransactionsWithUsers);
router.post('/', validateTransaction, transactionController.createTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;