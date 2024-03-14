const express = require('express');
const app = express.Router();
const path = require('path');
const {create , join} = require('../controllers/boardcontroller');
const { isLoggedIn } = require('../middleware/auth');

app.get('/', (req, res) => {
    res.send('Welcome');
});
app.route('/create').post(isLoggedIn,create)
app.route('/join/:id').post(isLoggedIn,join)
module.exports = app;