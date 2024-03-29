const User = require('../models/User');

exports.getAll = async () => {
    return User.findAll();
}