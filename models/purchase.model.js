import db from '../config/database.js'
import { DataTypes, Model } from 'sequelize'
import User from './user.model.js'

class Purchase extends Model {}

Purchase.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
        total: {type: DataTypes.FLOAT, allowNull: false},
    },
    {
        sequelize: db,
        modelName: 'Purchase'
    }
)

User.hasMany(Purchase)
Purchase.belongsTo(User)

export default Purchase