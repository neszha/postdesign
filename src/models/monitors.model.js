import { Sequelize } from 'sequelize';
import sqlite from '../databases/sqlite.db.js';

const { DataTypes } = Sequelize;

const monitorsModel = sqlite.define('monitors', {
    id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    serialNumber: {
        type: DataTypes.TEXT,
    },
    snName: {
        type: DataTypes.STRING(255),
    },
    snVersion: {
        type: DataTypes.STRING(255),
    },
    snServer: {
        type: DataTypes.STRING(255),
    },
    snEmail: {
        type: DataTypes.STRING(255),
    },
    snCreatedAt: {
        type: DataTypes.BIGINT,
    },
    snExpiredAt: {
        type: DataTypes.BIGINT,
    },
    status: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    publicIp: {
        type: DataTypes.STRING(32),
    },
    appTime: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    schoolInfo: {
        type: DataTypes.TEXT,
    },
    hitCounter: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamp: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        {
            fields: ['status'],
        },
        {
            fields: ['appTime'],
        },
    ],
});

export default monitorsModel;
