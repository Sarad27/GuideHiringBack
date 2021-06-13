const express = require('express')
const app = express();

const Auth = require("./auth")
const Destination = require("./destination")
const User = require('./user')
const Hire = require('./hire')

app.use(express.json());

app.use('/auth', Auth);

app.use('/destination', Destination)

app.use('/user', User);

app.use('/hire', Hire);


module.exports = app;