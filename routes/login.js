const express = require('express')
const users = require('../repositories/userRepository.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post("/", async (req, res) => {
    var user = await users.getByUsername(req.body.username)
    const tokenS = 'fcb507ae5e4ad241c8710a838717f1745a585d8b55476aff16dc9949cb5fb287df6bbd55c6776dd0de42fcd87a9ba35388e5622b20601b84417a881bc8770917'
    if (user.length == 0) {
        res.status(400).send('Cannot find user')
    }
    try {
        const correctPassword = await bcrypt.compare(req.body.password, user[0].password)
        if(correctPassword) {
            const userInformation = { id: user[0].id, email: user[0].email, password: user[0].password }
            var accessToken = await jwt.sign(userInformation, tokenS)
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