import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { Receiver } from "./ReceiverDB.js";
import { Task } from "./TaskAssignmentDB.js";
import { Admin } from "./AdminDB.js";
import { User } from "./UserDB.js";

export const ReceiverTask = sequelize.define('ReceiverTaskDB', {
    receiverTaskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Receiver, key: 'receiverId' }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: User, key: 'userId' },
    },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Admin, key: 'adminId' },
    },
    taskId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Task, key: 'taskId' }
    },
    taskStatus: {
        type: DataTypes.ENUM('Pending', 'Received', 'Completed'),
        allowNull: false,
    },
},
    {
        timstamp: true,
    })