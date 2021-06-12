const express = require('express')
const app = express();

const Auth = require("./auth")
const Destination = require("./destination")
const User = require('./user')

app.use(express.json());

app.use('/auth', Auth);

app.use('/destination', Destination)

app.use('/user', User);


module.exports = app;