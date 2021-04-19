const pool = require('../config.js')
var mysql = require('mysql')

const repository = {
    getByUsername: (email) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM user WHERE email = ?', email, (error, results, fields) => {
                if (error) reject(error)
                resolve(results)
            })
        })
    }
}

module.exports = repository