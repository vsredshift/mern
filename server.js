const express = require('express')
const mongoose = require('mongoose')

const products = require('./routes/api/Products')

const app = express()

// BodyParser Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// DB Configuration
const db = require('./config/keys').mongoURI

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))


// Use Routes
app.use('/api/products', products)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on ${port}`))

