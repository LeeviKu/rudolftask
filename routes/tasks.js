const express = require('express')
const users = require('../repositories/userRepository.js')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.get('/tasks', authenticateToken, async (req, res) => {
    // send tasks
    res.send(req.user.email)
})

function authenticateToken(req, res, next) {
    const tokenS = 'fcb507ae5e4ad241c8710a838717f1745a585d8b55476aff16dc9949cb5fb287df6bbd55c6776dd0de42fcd87a9ba35388e5622b20601b84417a881bc8770917'
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, tokenS, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = router