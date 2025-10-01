import {body} from 'express-validator'

const createProductValidator = [
    body('lot')
        .notEmpty()
        .withMessage('Product lot is required'),

    body('name')
        .notEmpty()
        .withMessage('Product name is required'),

    body('price')
        .notEmpty()
        .withMessage('Product price is required')
        .bail()
        .isFloat({ min: 1 })
        .withMessage('The price must be greater than 0'),

    body('quantity')
        .notEmpty()
        .withMessage('Product quantity is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('The minimum stock must be 1.'),

    body('entry_date')
        .notEmpty()
        .withMessage('Entry date is required'),
]
const updateProductValidator = [
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Product name is required'),

    body('price')
        .optional()
        .notEmpty()
        .withMessage('Product price is required')
        .bail()
        .isFloat({ min: 1 })
        .withMessage('Price must be greater than 0'),

    body('quantity')
        .optional()
        .notEmpty()
        .withMessage('Product quantity is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
]

export { createProductValidator, updateProductValidator }