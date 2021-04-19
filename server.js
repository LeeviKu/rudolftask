const express = require('express');
const cors = require('cors');
const login = require('./routes/login.js')
const tasks = require('./routes/tasks.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors())
app.use(express.json())

app.use("/login", login)
app.use("/api", tasks)


const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${server.address().port}`);
})

/*const p = async () => {
    const salt = await bcrypt.genSalt()
    const pw = await bcrypt.hash("salasana", salt)
    console.log(pw)
}

p()

*/