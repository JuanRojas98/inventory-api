import {Router} from 'express'
import {ProductController} from '../controllers/product.controller.js'
import {validateAuth} from '../middlewares/auth.middleware.js'
import {isAdmin} from '../middlewares/validateRole.middleware.js'
import {validateFields} from '../middlewares/validateFields.middleware.js'
import {createProductValidator, updateProductValidator} from '../validators/product.validator.js'

export const productRoutes = Router()

/**
 * @api {get} /api/v1/products Listar productos
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiDescription Devuelve todos los productos disponibles.
 *
 * @apiSuccessExample {json} 200 - Lista de productos
 * [
 *   {
 *         "id": 1,
 *         "lot": "PR123456",
 *         "name": "Producto 1",
 *         "price": 20526,
 *         "quantity": 20,
 *         "entryDate": "2025-08-27",
 *         "createdAt": "2025-10-01 15:26:27",
 *         "updatedAt": "2025-10-01 15:26:27"
 *   }
 * ]
 */
productRoutes.get('/', validateAuth, isAdmin, ProductController.getAll)

/**
 * @api {get} /api/v1/products/:id Obtener producto
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiDescription Devuelve los datos de un producto específico.
 *
 * @apiParam {Number} id ID único del producto.
 *
 * @apiSuccessExample {json} 200
 * {
 *     "id": 1,
 *     "lot": "PR123456",
 *     "name": "Producto 1",
 *     "price": 20526,
 *     "quantity": 20,
 *     "entryDate": "2025-08-27",
 *     "createdAt": "2025-10-01 15:26:27",
 *     "updatedAt": "2025-10-01 15:26:27"
 * }
 *
 * @apiError 404 Product not found.
 */
productRoutes.get('/:id', validateAuth, isAdmin, ProductController.getOne)

/**
 * @api {post} /api/v1/products Crear producto
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiDescription Crea un nuevo producto.
 *
 * @apiBody {String} lot Numero de lote.
 * @apiBody {String} name Nombre del producto.
 * @apiBody {Number} price Precio del producto.
 * @apiBody {Number} quantity Cantidad del producto.
 * @apiBody {String} entry_date Fecha de ingreso del producto.
 *
 * @apiSuccessExample {json} 201 - Product has been created
 * {
 *     "message": "Product has been created"
 * }
 */
productRoutes.post('/', validateAuth, isAdmin, createProductValidator, validateFields, ProductController.create)

/**
 * @api {put} /api/v1/products/:id Actualizar producto
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiDescription Actualiza un producto existente.
 *
 * @apiParam {Number} id ID único del producto.
 * @apiBody {String} [name] Nombre del producto.
 * @apiBody {Number} [price] Precio del producto.
 * @apiBody {Number} [quantity] Cantidad del producto.
 *
 * @apiSuccessExample {json} 200 - Product has been updated
 * {
 *     "message": "Product has been updated"
 * }
 */
productRoutes.put('/:id', validateAuth, isAdmin, updateProductValidator, validateFields, ProductController.update)