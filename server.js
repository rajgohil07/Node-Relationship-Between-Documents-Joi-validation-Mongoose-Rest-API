//reuires
const express = require('express');
const app = express();
require('dotenv').config();

//setteres
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./src/model')();
require('./src/route/route')(app);

//app listen
app.listen(process.env.PORT || 8081, () => console.log("Server is hosted at 127.0.0.1:" + process.env.PORT || 8081));