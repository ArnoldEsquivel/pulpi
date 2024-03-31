const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');
const { User } = require('../models/index')

exports.getAll = async (filters) => {
    // Here we define the query options
    let queryOptions = {
        where: {},
        paranoid: filters.includeDeleted ? false : true,
    };

    // On this IF we add the filters to the query options if they are present
    if (filters.withdrawalDateStart && filters.withdrawalDateEnd) {
        queryOptions.where.withdrawalDate = {
            [Op.between]: [filters.withdrawalDateStart, filters.withdrawalDateEnd],
        };
    }

    if (filters.rfc) queryOptions.where.rfc = filters.rfc;
    if (filters.invoice) queryOptions.where.invoice = filters.invoice;
    if (filters.status) queryOptions.where.status = filters.status;

    const transactions = await Transaction.findAll(queryOptions);
    return transactions;
};

exports.getAllWithUsers = async () => {
    return Transaction.findAll({
        include: {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'rfc', 'status']
        },
    });
};

exports.create = async (transactionData) => {
    const usuario = await User.findByPk(transactionData.user_id);
    if (!usuario) throw new Error('User not found');
    if (usuario.status !== 'ACTIVE') throw new Error('The user is not active');

    // We get the last transaction to generate the next folio
    const lastTransaction = await Transaction.findOne({
        order: [['createdAt', 'DESC']],
    });

    // If we dont have any transaction, we start with the folio AAF00001
    let nextInvoiceNumber = 1;

    if (lastTransaction) {
        // Get the last folio number and add 1 to generate the next one
        const lastFolioNumber = parseInt(lastTransaction.invoice.slice(3));
        nextInvoiceNumber = lastFolioNumber + 1;
    }

    // Generate the new folio and we add 0s to the left to have a 5 digit folio
    const newFolio = `AAF${nextInvoiceNumber.toString().padStart(5, '0')}`;

    transactionData.invoice = newFolio;

    const transaction = await Transaction.create(transactionData);
    return transaction;
};

exports.update = async (transactionId, updates) => {
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) throw new Error('Transaction not found');

    // Here we verify if the transaction is in PENDING status
    if (transaction.status !== 'PENDING') throw new Error('Only transactions with PENDING status can be updated');

    await transaction.update(updates);

    return transaction;
};


exports.delete = async (transactionId) => {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) throw new Error('Transaction not found');
    await transaction.destroy();
    return transaction;
};