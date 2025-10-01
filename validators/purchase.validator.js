import {body} from 'express-validator'

const createPurchaseValidator = [
    body('products')
        .isArray({min: 1})
        .withMessage('Products must be an array'),

    body('products.*.id')
        .notEmpty()
        .withMessage('Product id is required')
        .bail()
        .isInt()
        .withMessage('Product id must be a integer'),

    body('products.*.quantity')
        .notEmpty()
        .withMessage('Product quantity is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('The minimum quantity must be 1.'),
]

export { createPurchaseValidator }