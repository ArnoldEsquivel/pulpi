const { check, validationResult, body } = require('express-validator');

exports.updateTransaction = [
    check('status')
        .optional()
        .isIn(['PENDING', 'FAILED', 'COMPLETED']).withMessage('The status must be PENDING, FAILED, or COMPLETED.'),
    check('amount')
        .optional()
        .isInt({ min: 0 }).withMessage('The amount must be a positive number.')
        .not().isEmpty().withMessage('The amount is required if provided.'),
    check('commission')
        .optional()
        .isInt({ min: 0 }).withMessage('The commission must be a positive number.')
        .not().isEmpty().withMessage('The commission is required if provided.'),
    body().custom(body => {
        const keys = ['status', 'amount', 'commission'];
        const requestBodyKeys = Object.keys(body);
        const hasAtLeastOneKey = requestBodyKeys.some(key => keys.includes(key));
        if (!hasAtLeastOneKey) {
            throw new Error('At least one parameter (status, amount, commission) is required.');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];