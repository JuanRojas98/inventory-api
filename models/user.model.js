import {DataTypes, Model} from 'sequelize'

export default (sequelize) => {
    class User extends Model {}

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'User name is required'
                    }
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                nique: true,
                validate: {
                    len: {
                        args: [5,10],
                        msg: 'Username must be between 5 and 10 characters.',
                    },
                    notEmpty: {
                        msg: 'Username is required',
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Password is required'
                    }
                }
            },
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                allowNull: false,
                defaultValue: 'user'
            },
        },
        {
            sequelize,
            modelName: 'User',
            scopes: {
                withoutSensitiveInfo: {
                    attributes: { exclude: ['password'] }
                },
            },
        }
    )

    return User
}