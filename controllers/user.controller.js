import bcrypt from 'bcryptjs'
import {User} from '../models/index.js'
export class UserController {
    static async getAll(req, res, next) {
        try {
            const users = await User.scope('withoutSensitiveInfo').findAll()
            res.json(users)
        }
        catch (err) {
            next(err)
        }
    }

    static async getOne(req, res, next) {
        try {
            const {id} = req.params
            const user = await User.scope('withoutSensitiveInfo').findByPk(id)

            if (!user) return res.status(404).json({message: 'User not found'})
            res.json(user)
        }
        catch (err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const {name, username, password, role} = req.body

            const existingUser = await User.findOne({where: {username}})
            if (existingUser) return res.status(400).json({message: 'User already exists'})

            const passwordHash = await bcrypt.hash(password, 10);
            await User.create({name, username, password: passwordHash, role})
            res.status(201).json({message: 'User has been created'})
        }
        catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const {id} = req.params
            const user = await User.findByPk(id)

            if (!user) return res.status(404).json({message: 'User not found'})

            const {name, password, role} = req.body

            if (name) user.name = name
            if (role) user.role = role

            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }

            await user.save()
            res.json({message: 'User has been updated'})
        }
        catch (err) {
            next(err)
        }
    }
}