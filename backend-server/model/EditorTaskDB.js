import { DataTypes } from "sequelize";
import { Admin } from "./AdminDB.js"; // Ensure correct import
import { Task } from "./TaskAssignmentDB.js";
import { Editor } from "./EditorDB.js";
import { sequelize } from "../config/dbConnection.js";
import { User } from "./UserDB.js";

export const EditorTask = sequelize.define("EditorTaskDB", {
    editorTaskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    taskId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Task, key: "taskId" }
    },
    editorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Editor, key: "editorId" }
    },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Admin, key: "adminId" }
    },

    uploadImageLink: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In-Progress', 'Completed'),
        defaultValue: 'Pending',
    },
    notes: { type: DataTypes.STRING(255), allowNull: true }
}, { timestamps: true });
