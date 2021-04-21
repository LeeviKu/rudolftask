const express = require('express')
const users = require('../repositories/userRepository.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post("/", async (req, res) => {
    var user = await users.getByUsername(req.body.username)
    if (user.length == 0) {
        res.status(400).send('Cannot find user')
    }
    try {
        const correctPassword = await bcrypt.compare(req.body.password, user[0].password)
        if(correctPassword) {
            const userInformation = { id: user[0].id, email: user[0].email, password: user[0].password }
            var accessToken = await jwt.sign(userInformation, process.env.token_secret)
            res.json({
                accessToken: accessToken
            })
        } else {
            res.status(403).send()
        }
    } catch {
        res.status(500).send()
    }
})

module.exports = router