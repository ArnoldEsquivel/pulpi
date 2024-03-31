const User = require('./User');
const Transaction = require('./Transaction');

User.hasMany(Transaction, {
    foreignKey: 'user_id',
    as: 'transactions'
});

Transaction.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = {
    User,
    Transaction
};