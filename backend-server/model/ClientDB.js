import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { User } from "./UserDB.js";
import { Admin } from "./AdminDB.js";
// import { Admin } from "./AdminDB.js";

export const Client = sequelize.define('ClientDB', {
    clientId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    clientName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // userId: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     // unique: true,
    //     references: { model: User, key: "userId" },
    //     onDelete: "CASCADE",
    // },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: 'userId' },
        onDelete: 'CASCADE',
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GSTNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    timestamps: true
})


