/*
    This function takes a role parameter and only allows the role to that route

    Token names -
    1) seller - access-token-p
    2) delivery - access-token-d
    3) doctor - access-token-do
*/
const { verify } = require('jsonwebtoken');

function verifyPartToken(role){
    return async (req,res,next) => {
        let accessToken;
        
        //Get access token according to role
        try{
            if(role === "seller"){
                accessToken = req.cookies["access-token-p"];
            }
            else if(role === "delivery"){
                accessToken = req.cookies["access-token-d"];
            }
            else if(role === "doctor"){
                accessToken = req.cookies["access-token-doc"];
            }
            else{
                throw new Error("Role not provided")
            }
        }catch(error){
            console.error('Role not provided: ',error.message);
            return res.status(400).json({ "error": "Access Restricted! Token not verified" });
        }

        //If token not found
        if(!accessToken){
            return res.render('pages/login-pages/partner/partner-login.ejs',{
                message: "Login first to access the page",
                display: "flex",
                role: `${role}`
            })
        }

        //Validating token
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
            console.error('Error verifying token:', error.message);
            return res.render('pages/login-pages/partner/partner-login.ejs',{
                message: "Unable to verify user! Login again",
                display: "flex",
                role: `${role}`
            })
        }
    }
}

module.exports = {
    verifyPartToken : verifyPartToken
}