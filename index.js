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
const shopRoutes = require('./routes/shop/shop-routes.js');

//Api routes
const productAPI = require('./server/api/products-api.js');
const shopAPI = require('./server/api/shop-api.js');
const cartAPI = require('./server/api/cart-api.js');
const profileAPI = require('./server/api/profile-api.js')
const checkOutAPI = require('./server/api/checkout.js')

//Middlewares
const {verifyToken} = require('./middleware/login/token-verification.js')

//Serving directory through express.static
app.use(express.static(__dirname + '/public/', {
  mimeTypes: {
    'js': 'application/javascript'
  }
}));
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

//Api routes
app.use('/',productAPI);
app.use('/',shopAPI);
app.use('/',cartAPI);
app.use('/',profileAPI);
app.use('/',checkOutAPI)

//Server config
app.listen(8080 ,() => {
  console.log(`Server is listening on 8080`);
});