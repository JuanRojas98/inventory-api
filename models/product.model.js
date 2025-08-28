import db from '../config/database.js'
import { DataTypes, Model } from 'sequelize'

class Product extends Model {
    static async findByLot(lot) {
        return await Product.findOne({where: {lot}})
    }
}

Product.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        lot: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {notEmpty: {msg: 'Product lot is required'}}},
        name: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: {msg: 'Product name is required'}}},
        price: {type: DataTypes.FLOAT, allowNull: false, validate: {notEmpty: {msg: 'Product price is required'}}},
        quantity: {type: DataTypes.INTEGER, allowNull: false, validate: {notEmpty: {msg: 'Product quantity is required'}}},
        entryDate: {type: DataTypes.DATEONLY, allowNull: false, validate: {notEmpty: {msg: 'Product entryDate is required'}}}
    },
    {
        sequelize: db,
        modelName: 'Product'
    }
)

export default Product