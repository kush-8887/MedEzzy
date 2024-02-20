var express = require('express');
const cookieParser = require('cookie-parser');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

//External Routes
const custRegisterRoute = require('./routes/registerations/cust-reg-handler');
const custLoginRoute = require('./routes/login/cust-login');
const partRegisterRoute = require('./routes/registerations/partner-reg-handler');
const partLoginRoute = require('./routes/login/partner-login.js');
const shopRoutes = require('./routes/exp.js');

//Middlewares
const {verifyToken} = require('./middleware/login/token-verification.js')

//Serving directory through express.static
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/views/ '));

//allow json parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/',custRegisterRoute);
app.use('/',partRegisterRoute);
app.use('/',custLoginRoute);
app.use('/',partLoginRoute);
app.use('/',shopRoutes);
app.get('/',(req,res)=>{
    res.render('pages/main-home.ejs');
})

//Server config
app.listen(8080 ,() => {
  console.log(`Server is listening on 8080`);
});