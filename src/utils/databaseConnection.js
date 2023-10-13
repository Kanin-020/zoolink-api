const mysql = require('mysql2');

const connection = mysql.createConnection(({
    host: 'localhost',
    user: 'Kanin',
    password: '123',
    database: 'vet'
}));

module.exports = connection;
