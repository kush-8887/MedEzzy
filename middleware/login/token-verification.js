/*
    This function takes a role parameter and only allows the role to that route
*/
const { verify } = require('jsonwebtoken');

function verifyCustToken(role){
    return async (req, res, next) => {
        let accessToken = req.cookies["access-token"];
        if (!accessToken) {
            //Render page according to role!
            if(role === "customer"){
                // return res.render('pages/login-pages/user/user-login.ejs',{
                //     message: "Login first to access the page",
                //     display: "flex",
                // });
                //This can be a temproary fix
                return res.redirect('/customer-login');
            }
            else{
                return res.send("Internal server error! Please check middleware")
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
    };
}

module.exports = {
    verifyCustToken: verifyCustToken,
};