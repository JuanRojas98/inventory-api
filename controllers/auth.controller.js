import bcrypt from 'bcryptjs'
import {User} from '../models/index.js'
import {TokenService} from '../services/token.service.js'

export class AuthController {
    static async login(req, res, next) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({
                where: { username },
                attributes: ['id', 'name', 'password', 'role'],
            })

            if (!user) return res.status(404).json({message: 'User not found'})

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) return res.status(401).json({message: 'Password invalid'})

            const accessToken = await TokenService.generateAccessToken(user)
            const refreshToken = await TokenService.generateRefreshToken(user)

            res.status(200).json(
                {
                    id: user.id,
                    name: user.name,
                    accessToken,
                    refreshToken
                }
            )
        }
        catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const {name, username, password} = req.body

            const existingUser = await User.findOne({where: {username}})
            if (existingUser) return res.status(400).json({message: 'User already exists'})

            const passwordHash = await bcrypt.hash(password, 10);
            await User.create({name, username, password: passwordHash})
            res.status(201).json({message: 'User has been created'})
        }
        catch (err) {
            next(err)
        }
    }

    static async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.body

            if (! refreshToken) return res.status(400).json({message: 'No refresh token provided'})

            const payload = TokenService.validateRefreshToken(refreshToken)
            const accessToken = await TokenService.generateAccessToken(payload)

            res.status(200).json({accessToken})
        }
        catch (err) {
            next(err)
        }
    }
}