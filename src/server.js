
const express = require('express');


const path = require('path');

const cors = require('cors');

const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const auth = require("./routes/auth")

//load environmnet variables 
dotenv.config();

const app= express();



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(bodyParser.json());
app.use(cors());
app.get('/data',(req,res)=>{
    res.send("server is working ")
})
app.use('/api',auth)
require('./config/db')
const PORT=8081
app.listen( PORT,()=>{
    console.log(`server is listening on http://localhost:${PORT}`)
}
);