import { DataTypes } from "sequelize";
import { Task } from "./TaskAssignmentDB.js";
import { Photographer } from "./PhotoGrapherDB.js";
import { sequelize } from "../config/dbConnection.js";
import { Admin } from "./AdminDB.js";

export const PhotographerTask = sequelize.define("PhotographerTaskDB", {
    photographerTaskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    photographerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Photographer, key: "photographerId" }
    },
    taskId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Task, key: "taskId" }
    },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Admin, key: "adminId" }
    },
    uploadImageLink: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In-Progress', 'Completed'),
        defaultValue: 'Pending',
    },
    notes: { type: DataTypes.STRING(255), allowNull: true }
}, { timestamps: true });
