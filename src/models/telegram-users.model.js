import { Sequelize } from 'sequelize';
import sqlite from '../databases/sqlite.db.js';

const { DataTypes } = Sequelize;

const telegramUsersModel = sqlite.define('telegram_users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(64),
    },
    lastName: {
        type: DataTypes.STRING(64),
    },
    type: {
        type: DataTypes.STRING(32),
    },
}, {
    freezeTableName: true,
    timestamp: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

export default telegramUsersModel;
