import {Router} from "express";
import {AuthController} from '../controllers/auth.controller.js'

export const authRoutes = Router()

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiDescription Este endpoint se usa para iniciar sesión.
 * @apiGroup Auth
 *
 * @apiBody {String} username Nombre de usuario para acceder al sistema (obligatorio)
 * @apiBody {String} password Contraseña del usuario (obligatorio)
 *
 * @apiSuccess {Number} id ID del usuario
 * @apiSuccess {String} name Nombre del usuario
 * @apiSuccess {String} accessToken Token de acceso
 * @apiSuccess {String} refreshToken Token de refresco
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 * {
 *     "id": 1,
 *     "name": "Usuario prueba",
 *     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1Yhds456iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTYzNjU2NTIsImV4cCI6MTc1NjM2NjU1Mn0.VyOfW-zrE14PfMxeJ4J2aQ-dUg5LwzgtbjOZq5fqMP9",
 *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1YW4gUm9qYXMiLCJyb2xlIjoiYYhds456LCJpYXQiOjE3NTYzNjU2NTIsImV4cCI6MTc1NzIyOTY1Mn0.6dTT-S8V36NZr8VVI4I18gb8UD5YZEXQnnfViHdQAPF"
 * }
 *
 * @apiErrorExample {json} Error 400:
 * {"message": "Username is required"}
 */
authRoutes.post('/login', AuthController.login)

/**
 * @api {post} /auth/refresh Refresh token
 * @apiName Refresh
 * @apiDescription Este endpoint se usa para refrescar los tokens de acceso y refresco.
 * @apiGroup Auth
 *
 * @apiBody {String} refreshToken Token de refresco (obligatorio)
 *
 * @apiSuccess {String} accessToken Token de acceso
 * @apiSuccess {String} refreshToken Token de refresco
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 * {
 *     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1YW4gUm9qYXMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTYzNjU2NTIsImV4cCI6MTc1NjM2NjU1Mn0.VyOfW-zrE14PfMxeJ4J2aQ-dUg5LwzgtbjOZq5fqMP8",
 *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1YW4gUm9qYXMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTYzNjU2NTIsImV4cCI6MTc1NzIyOTY1Mn0.6dTT-S8V36NZr8VVI4I18gb8UD5YZEXQnnfViHdQAPE"
 * }
 *
 * @apiErrorExample {json} Error 400:
 * {"message": "No refresh token provided"}
 */
authRoutes.post('/refresh', AuthController.refreshToken)