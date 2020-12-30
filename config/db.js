const mysql = require('mysql');

const db = mysql.createPool({
  host: 'database-1.cip9531xqh6o.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: '05750575',
  database: '',
});

module.exports = db;
