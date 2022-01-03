const { check } = require('express-validator');

exports.discountCreateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required')
];