import {Router} from 'express'
import {PurchaseController} from '../controllers/purchase.controller.js'
import {validateAuth} from '../middlewares/auth.middleware.js'
import {isAdmin} from '../middlewares/validateRole.middleware.js'

export const purchaseRoutes = Router()

// Admin
/**
 * @api {get} /purchases/ Get all purchases
 * @apiName Get all purchases
 * @apiDescription Este endpoint se usa para visualizar el listado de las compras de todos los usuarios (Disponible solo para administradores).
 * @apiGroup Purchases
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 * [
 *     {
 *         "id": 1,
 *         "total": 102630,
 *         "date": "2025-08-27 22:34:44",
 *         "products": [
 *             {
 *                 "id": 1,
 *                 "name": "Producto 1",
 *                 "price": 20526,
 *                 "quantityPurchased": 5
 *             }
 *         ],
 *         "user": {
 *             "id": 1,
 *             "name": "Juan Rojas"
 *         }
 *     }
 * ]
 *
 * @apiErrorExample {json} Error 500:
 * {"message": "Internal server error"}
 */
purchaseRoutes.get('/admin', validateAuth, isAdmin, PurchaseController.getAll)

// Customer
/**
 * @api {get} /purchases/ Get all purchases by user
 * @apiName Get all purchases by user
 * @apiDescription Este endpoint se usa para visualizar el listado de las compras del usuario autenticado.
 * @apiGroup Purchases
 *
 * @apiSuccessExample {json} Respuesta exitosa:
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
 *
 * @apiErrorExample {json} Error 500:
 * {"message": "Internal server error"}
 */
purchaseRoutes.get('/', validateAuth, PurchaseController.getByUser)

/**
 * @api {get} /purchases/:id/invoice View an invoice purchase by user
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
 * @api {post} /purchases/ Add an purchase
 * @apiName Add an purchase
 * @apiDescription Este endpoint se usa para registrar una nueva compra.
 * @apiGroup Purchases
 *
 * @apiBody {Arrau} products Listado de productos. En este listado debe ir un objeto con la misma estructura de los productos, solo se debe incluir el ID del producto y la cantidad (quantity). (obligatorio)
 *
 * @apiSuccessExample {json} Respuesta exitosa:
 * [
 *     {
 *         "message": "Purchase has been created"
 *     }
 * ]
 *
 * @apiErrorExample {json} Error 404:
 * {"message": "Products not found"}
 * {"message": "Product not found or the available quantity is insufficient."}
 */
purchaseRoutes.post('/', validateAuth, PurchaseController.create)