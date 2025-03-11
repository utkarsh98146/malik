import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { Admin } from "./AdminDB.js";
import { User } from "./UserDB.js";

export const Photographer = sequelize.define('PhotographerDB', {
    photographerId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    // userId: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     unique: true,
    //     references: { model: User, key: 'adminId' },
    //     onDelete: 'CASCADE',
    // },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Admin, key: 'adminId' },
    },
    photographerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photographerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},
    {
        timestamps: true,
    }
)

