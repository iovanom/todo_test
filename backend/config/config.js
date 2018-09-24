const fs = require('fs');

module.exports = {
  development: {
    username: process.env['DB_USERNAME'] || 'root',
    password: process.env['DB_PASSWORD'] || 'secret',
    database: process.env['DB_NAME'] || 'task_db_dev',
    host: process.env['DB_HOSTNAME'] || '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: process.env['DB_USERNAME'] || 'root',
    password: process.env['DB_PASSWORD'] || 'secret',
    database: process.env['DB_NAME'] || 'task_db_test',
    host: process.env['DB_HOSTNAME'] || '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql'
  }
};
