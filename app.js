import express, {json} from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import morgan from 'morgan'
import logger from './utils/logger.js'
import {errorHandlerMiddleware} from './middlewares/errorHandler.middleware.js'
import {authRoutes} from './routes/auth.routes.js'
import {productRoutes} from './routes/product.routes.js'
import {purchaseRoutes} from './routes/purchase.routes.js'
import {userRoutes} from './routes/user.routes.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

// Logs HTTP
app.use(morgan('dev', {
    stream: { write: (msg) => logger.http(msg.trim()) }
}));

// Rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const apiUrl = '/api/v1'
app.use(`${apiUrl}/auth`, authRoutes)
app.use(`${apiUrl}/products`, productRoutes)
app.use(`${apiUrl}/purchases`, purchaseRoutes)
app.use(`${apiUrl}/users`, userRoutes)
app.use('/public', express.static(path.join(__dirname, 'public')))

// Middleware de errores
app.use(errorHandlerMiddleware)

export default app