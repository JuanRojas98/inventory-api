import { Sequelize } from 'sequelize'

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        timezone: "-05:00",
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        },
        port: process.env.DB_PORT,
        logging: false,
    }
)

export default db