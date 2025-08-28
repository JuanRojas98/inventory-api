import Product from '../models/product.model.js'

export class ProductController {
    static async getAll(req, res) {
        try {
            const products = await Product.findAll()
            res.json(products)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }

    static async getOne(req, res) {
        try {
            const {id} = req.params
            const product = await Product.findByPk(id)

            if (!product) return res.status(404).json({message: 'Product not found'})
            res.json(product)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }

    static async create(req, res) {
        try {
            const {lot} = req.body

            const product = await Product.findByLot(lot)
            if (product) return res.status(404).json({message: 'Product already exists'})

            const create = await Product.create(req.body)
            res.status(201).json({message: 'Product has been created'})
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }

    static async update(req, res) {
        try {
            const {id} = req.params

            const product = await Product.findByPk(id)
            if (!product) return res.status(404).json({message: 'Product not found'})

            await Product.update(req.body, {where: {id}})
            res.json({message: 'Product has been updated'})
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }
}