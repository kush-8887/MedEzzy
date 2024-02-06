const { verifyToken } = require('../middleware/login/token-verification');

const router = require('express').Router();



router.get('/shop',verifyToken('customer'),(req, res) => {
    res.render('pages/shop-pages/main-shop.ejs');
});
module.exports = router;