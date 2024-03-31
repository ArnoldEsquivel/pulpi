const Transaction = require('../models/Transaction');
const { User } = require('../models/index')

exports.getAll = async () => {
    // Agregar el filtrado
    return Transaction.findAll();
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

exports.delete = async (transactionId) => {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) throw new Error('Transaction not found');
    await transaction.destroy();
    return transaction;
};