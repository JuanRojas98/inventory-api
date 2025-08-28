import Purchase from '../models/purchase.model.js'
import Product from '../models/product.model.js'
import PurchaseItem from "../models/purchaseItem.model.js";
import User from '../models/user.model.js'

export class PurchaseController {
    static async getAll(req, res) {
        try {
            const purchases = await Purchase.findAll({
                attributes: ['id', 'date', 'total'],
                include: [
                    {
                        model: Product,
                        through: {
                            attributes: ['quantity']
                        }
                    },
                    {
                        model: User,
                        attributes: ['id', 'name']
                    }
                ]
            })

            const purchasesFormated = purchases.map(purchase => ({
                id: purchase.id,
                total: purchase.total,
                date: purchase.date,
                products: purchase.Products.map(prod => ({
                    id: prod.id,
                    name: prod.name,
                    price: prod.price,
                    quantityPurchased: prod.PurchaseItem.quantity
                })),
                user: purchase.User,
            }))

            res.json(purchasesFormated)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }
    
    static async getByUser(req, res) {
        try {
            const userId = req.user.id
            const purchases = await Purchase.findAll({
                where: { UserId: userId },
                attributes: ['id', 'date', 'total'],
                include: [
                    {
                        model: Product,
                        attributes: ["id", "lot", "name", "price"],
                        through: { attributes: ["quantity"] },
                    },
                ],
            })
            const purchasesFormated = purchases.map(purchase => ({
                id: purchase.id,
                total: purchase.total,
                date: purchase.date,
                products: purchase.Products.map(prod => ({
                    id: prod.id,
                    lot: prod.lot,
                    name: prod.name,
                    price: prod.price,
                    quantityPurchased: prod.PurchaseItem.quantity
                }))
            }))

            res.json(purchasesFormated)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }

    static async getInvoice(req, res) {
        try {
            const UserId = req.user.id
            const { id } = req.params

            const purchase = await Purchase.findOne({
                where: { id, UserId },
                attributes: ['id', 'date', 'total'],
                include: [
                    {
                        model: Product,
                        attributes: ["id", "lot", "name", "price"],
                        through: { attributes: ['quantity'] },
                    },
                ],
            })

            if (!purchase) return res.status(404).json({ message: 'Purchase not found' })

            const purchaseFormated = {
                id: purchase.id,
                total: purchase.total,
                date: purchase.date,
                products: purchase.Products.map(prod => ({
                    id: prod.id,
                    lot: prod.lot,
                    name: prod.name,
                    price: prod.price,
                    quantityPurchased: prod.PurchaseItem.quantity
                })),
            }

            res.json(purchaseFormated);
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }

    static async create(req, res) {
        try {
            const {products} = req.body

            // Validamos que exista una lista de productos
            if (products.length === 0) return res.status(404).json({error: 'Products not found'})

            // Validamos si el producto existe y si tiene cantidad disponible
            for (const item of products) {
                const product = await Product.findByPk(item.id)

                if (! product || product.quantity < item.quantity) return res.status(400).json({message: `Product not found or the available quantity is insufficient. ${product?.name || item.id}`})
            }

            let total = 0

            // Registro de la compra
            const purchase = await Purchase.create({UserId: req.user.id, total: 0})

            // Registro de los productos de la compra y calculo del total de la compra
            for (const item of products) {
                const product = await Product.findByPk(item.id)
                await PurchaseItem.create({quantity: item.quantity, PurchaseId: purchase.id, ProductId: item.id})

                total += product.price * item.quantity
                product.quantity = product.quantity - item.quantity
                await product.save()
            }

            purchase.total = total
            await purchase.save()
            res.status(201).json({message: 'Purchase has been created'})
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }
}