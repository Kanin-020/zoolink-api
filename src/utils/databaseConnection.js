const mysql = require('mysql2');

const connection = mysql.createConnection(({
    host: 'localhost',
    user: 'root',
    database: 'vet'
}));

module.exports = connection;
