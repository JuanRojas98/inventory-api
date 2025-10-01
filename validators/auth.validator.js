import {body} from 'express-validator'

const loginValidator = [
    body('username')
        .notEmpty()
        .withMessage('Username is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
]
const registerUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required'),

    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .bail()
        .isLength({min: 5, max: 10})
        .withMessage('Username must be between 5 and 10 characters.'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
]

export { loginValidator, registerUserValidator }