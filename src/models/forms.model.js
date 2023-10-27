import { Sequelize } from 'sequelize';
import sqlite from '../databases/sqlite.db.js';

const { DataTypes } = Sequelize;

const formsModel = sqlite.define('forms', {
    key: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamp: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

export default formsModel;
