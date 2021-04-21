var mysql = require('mysql')
require('dotenv').config()

module.exports = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})