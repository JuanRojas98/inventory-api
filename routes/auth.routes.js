import {Router} from "express";
import {AuthController} from '../controllers/auth.controller.js'
import {loginValidator, registerUserValidator} from '../validators/auth.validator.js'
import {validateFields} from '../middlewares/validateFields.middleware.js'

export const authRoutes = Router()

/**
 * @api {post} /api/v1/auth/login Iniciar sesión
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiDescription Permite a un usuario autenticarse y obtener tokens de acceso y refresco.
 *
 * @apiBody {String} username Username del usuario.
 * @apiBody {String} password Contraseña del usuario.
 *
 * @apiSuccess {String} accessToken Token de acceso válido por 15 minutos.
 * @apiSuccess {String} refreshToken Token de refresco válido por 1 día.
 *
 * @apiSuccessExample {json} 200 - Éxito
 * {
 *   "accessToken": "eyJhbGciOiJIUzI1...",
 *   "refreshToken": "eyJhbGciOiJIUzI1..."
 * }
 *
 * @apiError 401 Password invalid.
 */
authRoutes.post('/login', loginValidator, validateFields, AuthController.login)

/**
 * @api {post} /api/v1/auth/register Registrar usuario
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiDescription Crea un nuevo usuario en la plataforma.
 *
 * @apiBody {String} name Nombre del usuario.
 * @apiBody {String} username Username del usuario.
 * @apiBody {String} password Contraseña segura.
 *
 * @apiSuccessExample {json} 201 - User has been created
 * {
 *     "message": "User has been created"
 * }
 *
 * @apiError 400 User already exists.
 */
authRoutes.post('/register', registerUserValidator, validateFields, AuthController.register)


/**
 * @api {post} /api/v1/auth/refresh Refrescar token
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiDescription Genera un nuevo accessToken usando el refreshToken válido.
 *
 * @apiBody {String} refreshToken Token de refresco válido.
 *
 * @apiSuccessExample {json} 200 - Éxito
 * {
 *   "accessToken": "eyJhbGciOiJIUzI1..."
 * }
 *
 * @apiError 400 No refresh token provided.
 */
authRoutes.post('/refresh', AuthController.refreshToken)