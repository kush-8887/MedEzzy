/* 
    userData must contain role to work! (Role must be defined by developer)

    Token names -
    1) seller - access-token-p
    2) delivery - access-token-d
    3) doctor - access-token-do
*/

const router = require('express').Router();
const {partEmailCheckLogin} = require('../../services/register-services/part-email-login');
const {checkPartPass} = require('../../services/register-services/part-pass');
const {createPartToken} = require('../../server/jwt/part-jwt');

//Seller Login page
router.get('/seller-login',(req,res)=>{
    res.render('pages/login-pages/partner/partner-login.ejs',{
        message: "",
        display: "none",
        role : "seller"
    })
})
//Delivery Login page
router.get('/delivery-login',(req,res)=>{
    res.render('pages/login-pages/partner/partner-login.ejs',{
        message: "",
        display: "none",
        role : "delivery"
    })
})
//Doctor Login page
router.get('/doctor-login',(req,res)=>{
    res.render('pages/login-pages/partner/partner-login.ejs',{
        message: "",
        display: "none",
        role : "doctor"
    })
})

//Post routes
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
                res.redirect('/test-page');
            }else{
                res.render('pages/login-pages/partner/partner-login.ejs',{
                    message: "Invalid Password!",
                    display: "flex",
                    role : "seller"
                })
            }
        }else{
            res.render('pages/login-pages/partner/partner-login.ejs',{
                message: "Email does not exist, New user? Register",
                display: "flex",
                role : "seller"
            })
        } 
    }
    catch{
        return res.status(500).json({ error: "Internal Server Error" });
    }
})
router.post('/login-delivery',async(req,res)=>{
    const userData = {
        user_email: req.body.email,
        user_pass: req.body.pass,
        user_role : "delivery"
    }
    try{
        let emailExist = await partEmailCheckLogin(userData)
        if(emailExist){
            const passExist = await checkPartPass(userData)
            if(passExist){
                const accessToken = await createPartToken(userData);
                res.cookie("access-token-d", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "Strict",
                });
                res.redirect('/test-page');
            }else{
                res.render('pages/login-pages/partner/partner-login.ejs',{
                    message: "Invalid Password!",
                    display: "flex",
                    role : "delivery"
                })
            }
        }else{
            res.render('pages/login-pages/partner/partner-login.ejs',{
                message: "Email does not exist, New user? Register",
                display: "flex",
                role : "delivery"
            })
        } 
    }
    catch{
        return res.status(500).json({ error: "Internal Server Error" });
    }
})
router.post('/login-doctor',async(req,res)=>{
    const userData = {
        user_email: req.body.email,
        user_pass: req.body.pass,
        user_role : "doctor"
    }
    try{
        let emailExist = await partEmailCheckLogin(userData)
        if(emailExist){
            const passExist = await checkPartPass(userData)
            if(passExist){
                const accessToken = await createPartToken(userData);
                res.cookie("access-token-doc", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "Strict",
                });
                res.redirect('/test-page');
            }else{
                res.render('pages/login-pages/partner/partner-login.ejs',{
                    message: "Invalid Password!",
                    display: "flex",
                    role : "doctor"
                })
            }
        }else{
            res.render('pages/login-pages/partner/partner-login.ejs',{
                message: "Email does not exist, New user? Register",
                display: "flex",
                role : "doctor"
            })
        } 
    }
    catch{
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

//Only for dev. To be removed!
router.get('/test-page',(req,res)=>{
    res.render('testpage.ejs')
})

module.exports = router;