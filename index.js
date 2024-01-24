var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

//External Routes
const custRegisterRoute = require('./routes/registerations/cust-reg-handler');
const partRegisterRoute = require('./routes/registerations/partner-reg-handler');

//Serving directory through express.static
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

//allow json parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/',custRegisterRoute);
app.use('/',partRegisterRoute);
app.get('/',(req,res)=>{
    res.render('pages/main-home.ejs');
})

//Server config
app.listen(8080);
console.log('Server is listening on port 8080');