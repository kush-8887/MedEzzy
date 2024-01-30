const { verifyToken } = require('../middleware/login/token-verification');

const router = require('express').Router();



router.get('/shop',verifyToken('customer'),(req, res) => {
    res.render('pages/page-after-login.ejs');
});
module.exports = router;