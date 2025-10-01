import app from './app.js'
import {db} from './models/index.js'
import logger from './utils/logger.js'

const port = process.env.PORT || 3000;

(async () => {
    try {
        await db.sync({alter: true}).then(() => {
            logger.info(`Database Connected successfully`)
        })

        app.listen(port, () => {
            logger.info(`Listening on port ${port}`)
        })
    }
    catch (err) {
        logger.error(`Error connecting to Database: ${err.message}`)
    }
})();