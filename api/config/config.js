const dotenv = require('dotenv');
const Sequelize = require('sequelize');
dotenv.config();

const MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'postgres';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'fake password';
const MYSQL_DB = process.env.MYSQL_DB || 'db_1';
const MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1';
const MYSQL_PORT = process.env.MYSQL_PORT || '5432';

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USERNAME, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'postgres'
});

const DEV_PORT = process.env.DEV_PORT ? Number(process.env.DEV_PORT) : 1337;

const config = {
    psql: {
        sequelize: sequelize
    },
    server: {
        port: DEV_PORT
    }
};

module.exports = config;