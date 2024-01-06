var express = require('express');
var app = express();

//Important to inlcude 
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/assets'));
app.use(express.static(__dirname + '/views'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/home',(req,res)=>{
    res.render('pages/main-home.ejs');
})

app.listen(8080);
console.log('Server is listening on port 8080');