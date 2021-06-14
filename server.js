if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const layouts = require('express-ejs-layouts')
const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.set(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true ,useUnifiedTopology: true } )
//mongoose.connect('mongodb://localhost/test', { useNewUrlParser : true } )

const db = mongoose.connection
db.on('error', Error => console.log(Error))
db.once('open', () => console.log('connected to db'))

const indexRouter = require('./routes/index')
app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)