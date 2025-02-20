import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection";

export const PhotoGrapher = sequelize.define('PhotoGrapherDb', {
    photographerId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    unitsAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Models: {
        type: DataTypes.ENUM['Male,Female,Boy,'],
        allowNull: false,
    },
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    uploadImages: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: true,
    })