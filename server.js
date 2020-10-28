if(process.env.NODE_ENV !=='production')
{
    require('dotenv').config();
}


const express = require('express');
const app = express();
const expresslayouts = require("express-ejs-layouts");
const indexrouter = require('./routers/index');
const authorsrouter = require('./routers/authors');
const bodyparser = require('body-parser');



app.set('view engine','ejs');
app.set('views','./views');
app.use(expresslayouts);
app.use(express.static('public'));
app.use('/',indexrouter);
app.use('/authors',authorsrouter);
app.use(bodyparser.urlencoded({ limit: '10mb',extended:false}));


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',(error) => console.error(error));
db.once('open',() => console.log('connected to mongoose'));


app.listen(process.env.PORT || 3700);