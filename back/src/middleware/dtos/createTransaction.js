const { check, validationResult } = require('express-validator');

exports.createTransaction = [
    check('user_id')
        .isInt().withMessage('The user ID must be an integer.')
        .not().isEmpty().withMessage('The user ID is required.'),
    check('rfc')
        .isString().withMessage('The RFC must be a string.')
        .not().isEmpty().withMessage('The RFC is required.'),
    check('withdrawalDate')
        .isISO8601().withMessage('The withdrawal date must be a valid date in the format YYYY-MM-DD.')
        .not().isEmpty().withMessage('The withdrawal date is required.'),
    check('status')
        .isIn(['PENDING', 'FAILED', 'COMPLETED']).withMessage('The status must be PENDING, FAILED or COMPLETED.')
        .not().isEmpty().withMessage('The status is required.'),
    check('amount')
        .isInt().withMessage('The amount must be an integer.')
        .not().isEmpty().withMessage('El monto es requerido.'),
    check('commission')
        .isInt().withMessage('The commission must be an integer.')
        .not().isEmpty().withMessage('The commission is required.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
