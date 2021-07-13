import {Sequelize} from 'sequelize';
export const db = new Sequelize(process.env.DB_NAME||'ts-server',  process.env.DB_USER_NAME||'root', process.env.DB_PASSWORD , {
    host: process.env.DB_HOST|| 'localhost',
    dialect: 'mysql',
    // logging: false
});

