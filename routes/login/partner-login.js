/* 
    userData must contain role to work! (Role must be defined by developer)
*/

const router = require('express').Router();
const {partEmailCheckLogin} = require('../../services/register-services/part-email-login');
const {checkPartPass} = require('../../services/register-services/part-pass');
const {createPartToken} = require('../../server/jwt/part-jwt');

//Seller Login page
router.get('/seller-login',(req,res)=>{
    res.render('pages/login-pages/partner/seller-login.ejs',{
        message: "",
        display: "none",
    })
})

router.post('/login-seller',async(req,res)=>{
    const userData = {
        user_email: req.body.email,
        user_pass: req.body.pass,
        user_role : "seller"
    }
    try{
        let emailExist = await partEmailCheckLogin(userData)
        if(emailExist){
            const passExist = await checkPartPass(userData)
            if(passExist){
                const accessToken = await createPartToken(userData);
                res.cookie("access-token-p", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "Strict",
                });
                res.send('login done!')
            }else{
                res.render('pages/login-pages/partner/seller-login.ejs',{
                    message: "Invalid Password!",
                    display: "flex",
                })
            }
        }else{
            res.render('pages/login-pages/partner/seller-login.ejs',{
                message: "Email does not exist, New user? Register",
                display: "flex",
            })
        } 
    }
    catch{
        return res.status(500).json({ error: "Internal Server Error" });
    }
})
module.exports = router;