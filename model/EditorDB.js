import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

export const Editor = sequelize.define("EditorDB", {
  editorId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});
