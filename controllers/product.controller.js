import {Product} from '../models/index.js'

export class ProductController {
    static async getAll(req, res, next) {
        try {
            const products = await Product.findAll()
            res.json(products)
        }
        catch (err) {
            next(err)
        }
    }

    static async getOne(req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.findByPk(id)

            if (!product) return res.status(404).json({message: 'Product not found'})
            res.json(product)
        }
        catch (err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const {lot, name, price, quantity, entry_date} = req.body

            const existingProduct = await Product.findByLot(lot)
            if (existingProduct) return res.status(400).json({message: 'Product already exists'})

            await Product.create({lot, name, price, quantity, entryDate: entry_date})
            res.status(201).json({message: 'Product has been created'})
        }
        catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const {id} = req.params

            const product = await Product.findByPk(id)
            if (!product) return res.status(404).json({message: 'Product not found'})

            const {name, price, quantity} = req.body
            if (name !== undefined) product.name = name
            if (price !== undefined) product.price = price
            if (quantity !== undefined) product.quantity = quantity

            await product.save()
            res.json({message: 'Product has been updated'})
        }
        catch (err) {
            next(err)
        }
    }
}