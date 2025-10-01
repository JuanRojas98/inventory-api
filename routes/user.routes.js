import {Router} from 'express'
import {UserController} from '../controllers/user.controller.js'
import {validateAuth} from '../middlewares/auth.middleware.js'
import {isAdmin} from '../middlewares/validateRole.middleware.js'
import {createUserValidator, updateUserValidator} from "../validators/user.validator.js";
import {validateFields} from "../middlewares/validateFields.middleware.js";

export const userRoutes = Router()


/**
 * @api {get} /api/v1/users Listar usuarios
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Obtiene la lista de todos los usuarios registrados.
 *
 * @apiSuccessExample {json} 200 - Lista de usuarios
 * [
 *   {
 *         "id": 1,
 *         "name": "Juan Rojas",
 *         "username": "jcrojas",
 *         "role": "admin",
 *         "createdAt": "2025-10-01 12:21:37",
 *         "updatedAt": "2025-10-01 12:21:37"
 *   }
 * ]
 */
userRoutes.get('/', validateAuth, isAdmin, UserController.getAll)

/**
 * @api {get} /api/v1/users/:id Obtener usuario
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Obtiene los datos de un usuario específico por ID.
 *
 * @apiParam {Number} id ID único del usuario.
 *
 * @apiSuccessExample {json} 200 - Usuario encontrado
 * {
 *     "id": 1,
 *     "name": "Juan Rojas",
 *     "username": "jcrojas",
 *     "role": "admin",
 *     "createdAt": "2025-10-01 12:21:37",
 *     "updatedAt": "2025-10-01 12:21:37"
 * }
 *
 * @apiError 404 UUser not found.
 */
userRoutes.get('/:id', validateAuth, isAdmin, UserController.getOne)

/**
 * @api {post} /api/v1/users Crear usuario
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Crea un nuevo usuario.
 *
 * @apiBody {String} name Nombre del usuario.
 * @apiBody {String} username Username del usuario.
 * @apiBody {String} password Contraseña.
 * @apiBody {string} role Rol del usuario.
 *
 * @apiSuccessExample {json} 201 - User has been created
 * {
 *     "message": "User has been created"
 * }
 */
userRoutes.post('/', validateAuth, isAdmin, createUserValidator, validateFields, UserController.create)


/**
 * @api {put} /api/v1/users/:id Actualizar usuario
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Actualiza los datos de un usuario existente.
 *
 * @apiParam {Number} id ID único del usuario.
 * @apiBody {String} [name] Nuevo nombre.
 * @apiBody {String} [password] Contraseña.
 * @apiBody {string} [role] Rol del usuario.
 *
 * @apiSuccessExample {json} 200 - User has been updated
 * {
 *     "message": "User has been updated"
 * }
 */
userRoutes.put('/:id', validateAuth, isAdmin, updateUserValidator, validateFields, UserController.update)