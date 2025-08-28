import db from '../config/database.js'
import { DataTypes, Model } from 'sequelize'
import Product from '../models/product.model.js'
import Purchase from '../models/purchase.model.js'

class PurchaseItem extends Model {}

PurchaseItem.init(
    {
        quantity: {type: DataTypes.INTEGER, allowNull: false}
    },
    {
        sequelize: db,
        modelName: 'PurchaseItem'
    }
)

Purchase.belongsToMany(Product, {through: PurchaseItem})
Product.belongsToMany(Purchase, {through: PurchaseItem})

export default PurchaseItem