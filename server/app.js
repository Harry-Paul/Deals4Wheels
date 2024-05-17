const express = require("express");
const app = express();

require("dotenv").config;
const bodyParser = require("body-parser");
const _ = require("lodash");
const https = require("https");
const router = express.Router();
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const ObjectID = require('mongodb').ObjectId;
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");
const connectDB = require("./config/dbConn");
const fsPromises = require("fs").promises;
const path = require("path")
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
connectDB();
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));


app.use('/auth', require('./routes/authRoutes'))

app.use('/predict', require('./routes/predict'))

app.use('/sell', require('./routes/sell'))

app.use('/car', require('./routes/car'))

app.use('/change', require('./routes/change'))

app.listen(4000,function(){
    console.log("Server is running");
});
