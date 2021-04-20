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
    },
    getTasks: (userId) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM task WHERE userId = ?', userId, (error, results, fields) => {
                if (error) reject(error)
                resolve(results)
            })
        })
    },
    addTask: (userId, title) => {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO task (userId, title) VALUES (?, ?)', [userId, title], (error, results, fields) => {
                if (error) reject(error)
                resolve(results)
            })
        })
    },
    deleteTask: (userId, title) => {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM task where userId = ? AND title = ?', [userId, title], (error, results, fields) => {
                if (error) reject(error)
                resolve(results)
            })
        })
    }
}

module.exports = repository