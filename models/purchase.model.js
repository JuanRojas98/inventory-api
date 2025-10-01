import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
    class Purchase extends Model {}

    Purchase.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id',
            }
        },
        {
            sequelize,
            modelName: 'Purchase'
        }
    )

    return Purchase
}