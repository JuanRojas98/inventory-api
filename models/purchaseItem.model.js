import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
    class PurchaseItem extends Model {}

    PurchaseItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            purchaseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'purchase_id'
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'product_id'
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: [1],
                        msg: 'The minimum quantity must be 1.'
                    }
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    min: {
                        args: [1],
                        msg: 'The price must be greater than 0'
                    }
                }
            }
        },
        {
            sequelize,
            modelName: 'PurchaseItem',
            tableName: 'purchase_item',
            timestamps: false
        }
    )

    return PurchaseItem
}