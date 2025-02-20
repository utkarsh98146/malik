import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection";
import { User } from "./UserDB";

export const Admin = sequelize.define('AdminDB', {
    adminId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: 'userId' },
        onDelete: 'CASCADE',
    }
}, {
    timestamps: true,
})

Admin.belongsTo(User, { forei })