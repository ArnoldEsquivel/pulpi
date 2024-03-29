const Transaction = require('../models/Transaction');

exports.getAll = async () => {
    // Agregar el filtrado
    return Transaction.findAll();
};

exports.create = async (data) => {
    return Transaction.create(data);
};
