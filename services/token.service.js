import jwt from 'jsonwebtoken'
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY

export class TokenService {
    static generateAccessToken(user) {
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {expiresIn: '15min'})
    }

    static generateRefreshToken(user) {
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        return jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {expiresIn: '1d'})
    }

    static validateAccessToken(accessToken) {
        return jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY)
    }

    static validateRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY)
    }
}