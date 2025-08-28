import {Router} from 'express'
import {UserController} from '../controllers/user.controller.js'
import {validateAuth} from '../middlewares/auth.middleware.js'
import {isAdmin} from '../middlewares/validateRole.middleware.js'

export const userRoutes = Router()

userRoutes.get('/', validateAuth, isAdmin, UserController.getAll)
userRoutes.get('/:id', validateAuth, isAdmin, UserController.getOne)
userRoutes.post('/', validateAuth, isAdmin, UserController.create)
userRoutes.put('/:id', validateAuth, isAdmin, UserController.update)