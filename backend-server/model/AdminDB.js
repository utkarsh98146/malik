import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { User } from "./UserDB.js";


export const Admin = sequelize.define('AdminDB', {
    adminId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId: { // belongs to UserDB
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: 'userId' },
        onDelete: 'CASCADE',
    },
    // adminName: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    // phoneNumber: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    // adminEmail: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    // password: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },

}, {
    timestamps: true,
})
