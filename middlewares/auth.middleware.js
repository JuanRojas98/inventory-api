import {TokenService} from "../services/token.service.js";

export const validateAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) return res.status(401).json({message: 'No token provided'})

        const token = authHeader.split(' ')[1]
        const payload = TokenService.validateAccessToken(token)
        req.user = payload
        next()
    } catch (err) {
        return res.status(401).json({message: 'Invalid token'})
    }
}