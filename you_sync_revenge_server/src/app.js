require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('../models')
const checkTokenMiddleWare = require('./middleware/check-token-middleware')

// Include config file
const config = require('./config/config')

// Start server
const app = express()

// Use morgan HTTP request Logger
// combined : Standard Apache combined log output.
app.use(morgan('combined'))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(checkTokenMiddleWare)

app.use(cors())

require('./routes')(app)

// force tables to re-create themselves
// sequelize.sync({ force: true })
// Just check if tables are created
sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
