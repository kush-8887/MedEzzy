const router = require('express').Router();
const bcrypt = require('bcrypt');
const rand = require('random-key');

//Customer services
const {uploadCustomer} = require('../../database/register-login/reg-customer');
const {custEmailCheck} = require('../../services/register-services/cust-email-check');

//Date class
const getDate = new Date;

//User data obj
let userData;

//GET Routes
router.get('/register-customer',async(req,res)=>{
    res.render('pages/registeration-pages/user/user-reg.ejs',{
        message: "",
        display: "none"
    })
})

//Post routes
router.post('/register-customer', async(req,res)=>{
    try {
        userData = {
            "cust_id": rand.generateBase30(30),
            "cust_email": req.body.email,
            "cust_pass": await bcrypt.hash(req.body.pass, 10),
            "reg_date": getDate.toLocaleDateString(),
            "reg_time": getDate.getTime(),
            "cust_role": "customer",
            "cust_cart_id":rand.generateBase30(30)
        };
    }catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    //Check if email already exists in db
    try{
        var emailExist = await custEmailCheck(userData);
        if(emailExist){
            try {
                //Upload to the database
                const db_status = await uploadCustomer(userData);
                if (db_status) {
                    res.render('pages/login-pages/user/user-login.ejs',{
                        message: "",
                        display: "none",
                    });
                } else {
                    return res.status(500).json({ error: "An error occured!" });
                }
            } catch (error) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
        }else{
            //Tell user email already exits
            res.render('pages/registeration-pages/user/user-reg.ejs',{
                message: "Email already in exists! Use different email or login!",
                display: "flex"
            });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error @" });
    }
});


module.exports = router;