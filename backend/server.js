const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// express
const app = express()
app.use(bodyParser.json())
app.use(cors())

// api
const v1 = require('./router/v1')
app.use('/api/v1', v1)

// run
app.listen(8081, () => console.log('Listening on port 8081'))
