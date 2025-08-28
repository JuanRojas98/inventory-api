import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
export class UserController {
    static async getAll(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'username', 'role', 'createdAt']
            })
            res.json(users)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }

    static async getOne(req, res) {
        try {
            const {id} = req.params
            const user = await User.findByPk(id)

            if (!user) return res.status(404).json({message: 'User not found'})
            res.json(user)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }

    static async create(req, res) {
        try {
            const {name, username, password, role} = req.body

            const passwordHash = await bcrypt.hash(password, 10);
            const user = await User.create({name, username, password: passwordHash, role})

            res.status(201).json({message: 'User has been created'})
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }

    static async update(req, res) {
        try {
            const {id} = req.params
            const user = await User.findByPk(id)

            if (!user) return res.status(404).json({message: 'User not found'})

            if (req.body.password) {
                const passwordHash = await bcrypt.hash(req.body.password, 10);
                req.body.password = passwordHash
            }

            await User.update(req.body, {where: {id}})
            res.json({message: 'User has been updated'})
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({message: err.message})
        }
    }
}