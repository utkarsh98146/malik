import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { Admin } from "./AdminDB.js";
import { Client } from "./ClientDB.js";
import { Photographer } from "./PhotoGrapherDB.js";
import { User } from "./UserDB.js";
// import { Editor } from "./EditorDB.js";
// import { Photographer } from "./PhotoGrapherDB.js";
// import { Receiver } from "./ReceiverDB.js";
// import { Client } from "./ClientDB.js";

export const Task = sequelize.define("TaskDBs", {
    taskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    clientId: {  // link to client DB
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Client, key: "clientId" },
        onDelete: "CASCADE",
    },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: "userId" },
        onDelete: "CASCADE",
    },
    productName: {   // brand name
        type: DataTypes.STRING,
        allowNull: false,
    },
    stockCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    modelAssigned: {  // list of models assigned
        type: DataTypes.JSON,
        allowNull: false,
    },
    photoshootDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    receiverId: {  // link to receiver DB
        type: DataTypes.UUID,
        // references: { model: User, key: "userId" },
        allowNull: false,
    },
    photographerId: { // assigned to photographer
        type: DataTypes.UUID,
        allowNull: false,
        // references: { model: Photographer, key: "photographerId" }, // ✅ Fixed reference
    },
    editorId: {  // assigned to editor 
        type: DataTypes.JSON,
        // references: { model: User, key: "userId" },
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Pending", "Complete"),
        defaultValue: "Pending",
    },
    photoshootStatus: {
        type: DataTypes.ENUM("Pending", "Complete"),
        defaultValue: "Pending",
    },
}, {
    timestamps: true,
});
