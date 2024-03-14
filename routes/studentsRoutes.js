const express = require('express');
const app = express.Router();
const path = require('path');

const { registration, login  } = require('../controllers/studentcontroller');
// const { isLoggedIn } = require('../middleware/auth');

app.get('/', (req, res) => {
    res.send('Welcome');
});


app.route('/register').post(registration)
app.route('/login').post(login)

module.exports = app;