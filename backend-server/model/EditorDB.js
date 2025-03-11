import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { Admin } from "./AdminDB.js";
import { User } from "./UserDB.js";


export const Editor = sequelize.define("EditorDB", {
  editorId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  adminId: {
    type: DataTypes.UUID,
    allowNull: false,

    references: { model: User, key: "userId" },
    onDelete: "CASCADE",
  },
  // adminId: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  //   references: { model: Admin, key: "adminId" },
  //   onDelete: 'CASCADE',
  // },

  // editorName: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // phoneNumber: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // editorEmail: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // password: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  uploadImageLink: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In-Progress', 'Completed'),
    defaultValue: 'Pending',
  },

}, {
  timestamps: true,
});

