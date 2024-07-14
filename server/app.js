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
app.use(cors({credentials: true, origin: 'https://deals4wheels-dxzg.onrender.com/'}));
connectDB();
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 4000

app.use('/auth', require('./routes/authRoutes'))

app.use('/predict', require('./routes/predict'))

app.use('/sell', require('./routes/sell'))

app.use('/car', require('./routes/car'))

app.use('/change', require('./routes/change'))

app.use('/showcar', require('./routes/showcar'))

app.use('/showfav', require('./routes/showfav'))

app.use('/showchat', require('./routes/showchat'))

app.use('/favourite', require('./routes/fav'))

app.use('/sendchat', require('./routes/sendchat'))

app.use('/showchats', require('./routes/showchats'))

app.use('/filter', require('./routes/filter'))

app.use('/updatetrend', require('./routes/updatetrend'))

app.use('/bid', require('./routes/bid'))

app.use('/showbids', require('./routes/showbids'))

app.listen(PORT,function(){
    console.log("Server is running");
});
