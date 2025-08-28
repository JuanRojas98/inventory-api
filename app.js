import express, {json} from 'express'
import 'dotenv/config'
import db from './config/database.js'
import morgan from 'morgan'
import logger from './utils/logger.js'
import {authRoutes} from './routes/auth.routes.js'
import {productRoutes} from './routes/product.routes.js'
import {purchaseRoutes} from './routes/purchase.routes.js'
import {userRoutes} from './routes/user.routes.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use(
    morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
)

const apiUrl = '/api/v1'

app.use(`${apiUrl}/auth`, authRoutes)
app.use(`${apiUrl}/products`, productRoutes)
app.use(`${apiUrl}/purchases`, purchaseRoutes)
app.use(`${apiUrl}/users`, userRoutes)

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`)
    res.status(500).json({ message: 'Internal server error' })
});

db.sync().then(() => {
    console.log(`Database Connected successfully`)
})

export default app