import {Router} from 'express'
import {PurchaseController} from '../controllers/purchase.controller.js'
import {validateAuth} from '../middlewares/auth.middleware.js'
import {isAdmin} from '../middlewares/validateRole.middleware.js'
import {createPurchaseValidator} from '../validators/purchase.validator.js'
import {validateFields} from '../middlewares/validateFields.middleware.js'

export const purchaseRoutes = Router()

// Admin
/**
 * @api {get} /api/v1/purchases Listar compras (Administrador)
 * @apiGroup Purchases
 * @apiVersion 1.0.0
 * @apiDescription Devuelve todas las compras registradas.
 *
 * @apiSuccessExample {json} 200
 * [
 *     {
 *         "id": 1,
 *         "total": 102630,
 *         "date": "2025-08-27 22:34:44",
 *         "products": [
 *             {
 *                 "id": 1,
 *                 "lot": "PR123456",
 *                 "name": "Producto 1",
 *                 "price": 20526,
 *                 "quantityPurchased": 5
 *             }
 *         ]
 *     }
 * ]
 */
purchaseRoutes.get('/', validateAuth, isAdmin, PurchaseController.getAll)

// Customer
/**
 * @api {get} /api/v1/purchases Listar compras (Usuario autenticado)
 * @apiGroup Purchases
 * @apiVersion 1.0.0
 * @apiDescription Devuelve todas las compras registradas del usuario autenticado.
 *
 * @apiSuccessExample {json} 200
 * [
 *     {
 *         "id": 1,
 *         "total": 102630,
 *         "date": "2025-08-27 22:34:44",
 *         "products": [
 *             {
 *                 "id": 1,
 *                 "lot": "PR123456",
 *                 "name": "Producto 1",
 *                 "price": 20526,
 *                 "quantityPurchased": 5
 *             }
 *         ]
 *     }
 * ]
 */
purchaseRoutes.get('/', validateAuth, PurchaseController.getByUser)

/**
 * @api {get} /purchases/:id/invoice Ver una factura de compra por usuario
 * @apiName View an invoice purchase by user
 * @apiDescription Este endpoint se usa para visualizar la factura de compra por ID del usuario autenticado.
 * @apiGroup Purchases
 *
 * @apiParam {Number} id ID de la compra (obligatorio)
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 * {
 *     "id": 1,
 *     "total": 102630,
 *     "date": "2025-08-27 22:34:44",
 *     "products": [
 *         {
 *             "id": 1,
 *             "lot": "PR123456",
 *             "name": "Producto 1",
 *             "price": 20526,
 *             "quantityPurchased": 5
 *         }
 *     ]
 * }
 *
 * @apiErrorExample {json} Error 404:
 * {"message": "Purchase not found"}
 */
purchaseRoutes.get('/:id/invoice', validateAuth, PurchaseController.getInvoice)

/**
 * @api {post} /api/v1/purchases Crear compra
 * @apiGroup Purchases
 * @apiVersion 1.0.0
 * @apiDescription Registra una nueva compra.
 *
 * @apiBody {Array} products Lista de productos de la compra.
 * @apiBody {Number} id ID del producto (Estos campos hacen parte del objeto que debe ir en el array de productos).
 * @apiBody {Number} quantity Cantidad del producto (Estos campos hacen parte del objeto que debe ir en el array de productos).
 *
 * @apiSuccessExample {json} 201 - Purchase has been created
 * {
 *     "message": "Purchase has been created"
 * }
 */
purchaseRoutes.post('/', validateAuth, createPurchaseValidator, validateFields, PurchaseController.create)