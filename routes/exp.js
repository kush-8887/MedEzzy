const { verifyCustToken} = require('../middleware/login/token-verification');
const {verifyPartToken} = require('../middleware/login/token-verification-p');  

const router = require('express').Router();

router.get('/shop',verifyCustToken('customer'),(req, res) => {
    res.render('pages/shop-pages/main-shop.ejs');
});

router.get('/xyz',verifyPartToken('seller'),(req,res)=>{
    res.send('seller allowed only')
})

module.exports = router;