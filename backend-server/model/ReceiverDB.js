import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { Admin } from "./AdminDB.js";
import { User } from "./UserDB.js";

export const Receiver = sequelize.define('ReceiverDB', {
    receiverId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Admin, key: 'adminId' }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: User, key: 'userId' },

    },
    receiverName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiverEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    timestamps: true
})
