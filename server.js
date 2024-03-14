require('dotenv').config()
var cors = require('cors')
const express = require('express');
const app = express();
const PORT = 4000;
const connection = require('./db/db');
const board = require('./routes/boardroutes')
const student =require('./routes/studentsRoutes')
connection()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use('/api/v1/board' ,board);
app.use('/api/v1/user' ,student);

app.listen(PORT,()=>{console.log(`Server Running on http://localhost:${PORT}`)});