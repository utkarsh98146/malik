import { sequelize } from "../config/dbConnection.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define('UserDB', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { arg: true, msg: 'Enter a valid email address' }
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        isNumeric: true,          // will only allow numbers.
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Receiver', 'Editor', 'Photographer'),
        allowNull: true,
    },
    resetToken: {
        type: DataTypes.STRING,  // stores token for reset password
        allowNull: true,
    },
    resetTokenExpiry: {
        type: DataTypes.DATE,  // expiry time for reset token
        allowNull: true,
    }
},
    {
        timestamps: true
    })