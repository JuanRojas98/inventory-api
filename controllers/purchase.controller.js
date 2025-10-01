import {Product, Purchase, PurchaseItem, User} from '../models/index.js'

export class PurchaseController {
    static async getAll(req, res, next) {
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
            next(err)
        }
    }
    
    static async getByUser(req, res, next) {
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
            next(err)
        }
    }

    static async getInvoice(req, res, next) {
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
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const {products} = req.body

            if (products.length === 0) return res.status(404).json({error: 'Products not found'})

            for (const item of products) {
                const product = await Product.findByPk(item.id)

                if (! product || product.quantity < item.quantity) return res.status(400).json({message: `Product not found or the available quantity is insufficient. ${product?.name || item.id}`})
            }

            let total = 0
            const purchase = await Purchase.create({userId: req.user.id, total: 0})

            for (const item of products) {
                const product = await Product.findByPk(item.id)
                await PurchaseItem.create({ purchaseId: purchase.id, productId: item.id, quantity: item.quantity, price: product.price })

                total += product.price * item.quantity
                product.quantity = product.quantity - item.quantity
                await product.save()
            }

            purchase.total = total
            await purchase.save()
            res.status(201).json({message: 'Purchase has been created'})
        }
        catch (err) {
            next(err)
        }
    }
}