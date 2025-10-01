import db from '../config/database.js'
import ProductModel from './product.model.js'
import PurchaseModel from './purchase.model.js'
import PurchaseItemModel from './purchaseItem.model.js'
import UserModel from './user.model.js'

const Product = ProductModel(db)
const Purchase = PurchaseModel(db)
const PurchaseItem = PurchaseItemModel(db)
const User = UserModel(db)

User.hasMany(Purchase, { foreignKey: 'user_id' })
Purchase.belongsTo(User, { foreignKey: 'user_id' })

Product.belongsToMany(Purchase, { through: PurchaseItem, foreignKey: 'product_id', otherKey: 'purchase_id' })
Purchase.belongsToMany(Product, { through: PurchaseItem, foreignKey: 'purchase_id', otherKey: 'product_id' })

export {db, Product, Purchase, PurchaseItem, User}