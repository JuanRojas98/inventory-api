import db from '../config/database.js'
import {DataTypes, Model} from 'sequelize'

class User extends Model {}

User.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: {msg: 'User name is required'}}},
        username: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {notEmpty: {msg: 'User username is required'}}},
        password: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: {msg: 'User password is required'}}},
        role: {type: DataTypes.ENUM('admin', 'user'), allowNull: false, defaultValue: 'user'},
    },
    {
        sequelize: db,
        modelName: 'User'
    }
)

export default User