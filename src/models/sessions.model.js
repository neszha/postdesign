import { Sequelize } from 'sequelize';
import sqlite from '../databases/sqlite.db.js';

const { DataTypes } = Sequelize;

const sessionsModel = sqlite.define('sessions', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
    },
    accessKey: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    loginIp: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    loginAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    logoutAt: {
        type: DataTypes.BIGINT,
    },
}, {
    freezeTableName: true,
    timestamp: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        {
            fields: ['isValid'],
        },
        {
            fields: ['loginAt'],
        },
        {
            fields: ['logoutAt'],
        },
    ],
});

export default sessionsModel;
