import {Router} from 'express'
import {ProductController} from "../controllers/product.controller.js";
import {validateAuth} from '../middlewares/auth.middleware.js'
import {isAdmin} from '../middlewares/validateRole.middleware.js'

export const productRoutes = Router()

/**
 * @api {get} /products/ Get all products
 * @apiName Get all products
 * @apiDescription Este endpoint se usa para visualizar el listado de productos (Disponible solo para administradores).
 * @apiGroup Products
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 * [
 *     {
 *         "id": 1,
 *         "lot": "PR123456",
 *         "name": "Producto 1",
 *         "price": 20526,
 *         "quantity": 10,
 *         "entryDate": "2025-08-27",
 *         "createdAt": "2025-08-27 21:54:05",
 *         "updatedAt": "2025-08-27 22:34:44"
 *     }
 * ]
 *
 * @apiErrorExample {json} Error 500:
 * {"message": "Internal server error"}
 */
productRoutes.get('/', validateAuth, isAdmin, ProductController.getAll)

/**
 * @api {get} /products/:id View an product
 * @apiName View an product
 * @apiDescription Este endpoint se usa para visualizar los datos de un producto por su ID (Disponible solo para administradores).
 * @apiGroup Products
 *
 * @apiParam {Number} id ID del producto (obligatorio)
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 * {
 *     "id": 1,
 *     "lot": "PR123456",
 *     "name": "Producto 1",
 *     "price": 20526,
 *     "quantity": 10,
 *     "entryDate": "2025-08-27",
 *     "createdAt": "2025-08-27 21:54:05",
 *     "updatedAt": "2025-08-27 22:34:44"
 * }
 *
 * @apiErrorExample {json} Error 404:
 * {"message": "Product not found"}
 */
productRoutes.get('/:id', validateAuth, isAdmin, ProductController.getOne)

/**
 * @api {post} /products/ Add an product
 * @apiName Add an product
 * @apiDescription Este endpoint se usa para registrar un nuevo producto (Disponible solo para administradores).
 * @apiGroup Products
 *
 * @apiBody {String} lot Número de lote (obligatorio)
 * @apiBody {String} name Nombre del producto (obligatorio)
 * @apiBody {Float} price Precio del producto (obligatorio)
 * @apiBody {Number} quantity Cantidad disponible del producto (obligatorio)
 * @apiBody {Date} entryDate Fecha de ingreso del producto (obligatorio)
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 * {
 *     "message": "Product has been created"
 * }
 *
 * @apiErrorExample {json} Error 404:
 * {"message": "Product already exists"}
 */
productRoutes.post('/', validateAuth, isAdmin, ProductController.create)

/**
 * @api {put} /products/:id Edit an product
 * @apiName Edit an product
 * @apiDescription Este endpoint se usa para actualizar los datos de un producto (Disponible solo para administradores).
 * @apiGroup Products
 *
 * @apiParam {Number} id ID del producto (obligatorio)
 *
 * @apiBody {String} [name] Nombre del producto
 * @apiBody {Float} [price] Precio del producto
 * @apiBody {Number} [quantity] Cantidad disponible del producto
 * @apiBody {Date} [entryDate] Fecha de ingreso del producto
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 * {
 *     "message": "Product has been updated"
 * }
 *
 * @apiErrorExample {json} Error 404:
 * {"message": "Product not found"}
 */
productRoutes.put('/:id', validateAuth, isAdmin, ProductController.update)