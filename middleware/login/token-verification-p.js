/*
    This function takes a role parameter and only allows the role to that route
*/
const { verify } = require('jsonwebtoken');

function verifyPartToken(role){
    return async (req,res,next) => {
        console.log(req.cookies);
        //Use different types of cookie name!
        let accessToken = req.cookies["access-token-p"];
        if(!accessToken){
            if(role === "seller"){
                return res.render('pages/login-pages/partner/seller-login.ejs',{
                    message: "Login first to access the page",
                    display: "flex",
                })
            }
            if(role === "delivery"){
                return res.render('',{

                })
            }
            if(role === "doctor"){
                return res.render('',{

                })
            }
            else{

            }
        }
        try {
            const validToken = verify(accessToken, 'secretKey');
            const allowedRole = validToken["userInfo"]["user_role"];

            if (validToken && allowedRole === role) {
                req.authenticated = true;
                return next();
            } else {
                throw new Error("Invalid token");
            }
        } catch (error) {
            //Enter you are not logged in page and link to login
            console.error('Error verifying token:', error.message);
            return res.status(400).json({ "error": "Access Restricted! Token not verified" });
        }
    }
}

module.exports = {
    verifyPartToken : verifyPartToken
}