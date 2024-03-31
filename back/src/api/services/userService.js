const User = require('../models/User');

exports.getAll = async () => {
    return User.findAll();
}

// This ep was created to follow the principle of separation of concerns
exports.getForTransations = async () => {
    return User.findAll({
        attributes: ['id', 'name', 'rfc', 'status']
    });
}