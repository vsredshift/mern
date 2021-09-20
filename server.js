const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

const products = require('./routes/api/Products')
const users = require('./routes/api/Users')
const auth = require('./routes/api/auth')

const app = express()

// BodyParser Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// DB Configuration
const db = config.get('mongoURI')

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))


// Use Routes
app.use('/api/products', products)
app.use('/api/users', users)
app.use('/api/auth', auth)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on ${port}`))

