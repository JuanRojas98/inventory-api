import {body} from 'express-validator'

const createUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required'),

    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .bail()
        .isLength({min: 5, max: 10})
        .withMessage('Username must be between 5 and 10 characters.'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    body('role')
        .optional()
        .notEmpty()
        .withMessage('Role is required')
]
const updateUserValidator = [
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Product name is required'),

    body('username')
        .optional()
        .notEmpty()
        .withMessage('Username is required')
        .bail()
        .isLength({min: 5, max: 10})
        .withMessage('Username must be between 5 and 10 characters.'),

    body('password')
        .optional()
        .notEmpty()
        .withMessage('Password is required'),

    body('role')
        .optional()
        .notEmpty()
        .withMessage('Role is required')
]

export { createUserValidator, updateUserValidator }