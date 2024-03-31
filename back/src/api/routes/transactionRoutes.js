const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { createTransaction } = require('../../middleware/dtos/createTransaction');
const { updateTransaction } = require('../../middleware/dtos/updateTransaction');

router.get('/', transactionController.getAllTransactions);
router.get('/users', transactionController.getAllTransactionsWithUsers);
router.post('/', createTransaction, transactionController.createTransaction);
router.patch('/:id', updateTransaction, transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;