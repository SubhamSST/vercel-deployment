const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const main = require('./server/routes/main');
const mongoose=require('mongoose');


const dburi='mongodb+srv://tripathysubham4:PMp1PASTcYelMFpj@cluster0.voylvs8.mongodb.net/';
mongoose.connect(dburi)
.then((result)=>console.log("connected to db"))
.catch((err)=>{console.log(err)});

const app = express();
const PORT = process.env.PORT || 5000;

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(main);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
