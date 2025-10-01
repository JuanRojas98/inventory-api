import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
    class Product extends Model {
        static async findByLot(lot) {
            return await Product.findOne({where: {lot}})
        }
    }

    Product.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            lot: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'Product lot is required'
                    }
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Product name is required'
                    }
                }
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Product price is required'
                    },
                    min: {
                        args: [1],
                        msg: 'The price must be greater than 0'
                    }
                }
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Product quantity is required'
                    },
                    min: {
                        args: [1],
                        msg: 'The minimum stock must be 1.'
                    }
                }
            },
            entryDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Product entry date is required'
                    }
                },
                field: 'entry_date'
            }
        },
        {
            sequelize,
            modelName: 'Product'
        }
    )

    return Product
}