const router = require('express').Router();
const bcrypt = require('bcrypt');
const rand = require('random-key');

//Customer services
const {uploadCustomer} = require('../../database/register-login/reg-customer');
const {custEmailCheck} = require('../../services/register-services/cust-email-check');

//Partner services
const {uploadPartner} = require('../../database/register-login/reg-partner');
const {partEmailCheck} = require('../../services/register-services/cust-email-check');


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

router.get('/register-partner',async(req,res)=>{
    res.render('pages/registeration-pages/partner/partner-reg.ejs',{
        message: "",
        display: "none"
    });
})

//Post routes
//Customer
router.post('/register-customer', async(req,res)=>{
    //user role is very imp!
    try {
        userData = {
            "user_id": rand.generateBase30(30),
            "user_email": req.body.email,
            "user_pass": await bcrypt.hash(req.body.pass, 10),
            "reg_date": getDate.toLocaleDateString(),
            "reg_time": getDate.getTime(),
            "user_role": "customer",
        };
        console.log(userData);
    }catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    //Check if email already exists in db
    try{
        var emailExist = await custEmailCheck(userData);
        console.log(emailExist);
        if(emailExist){
            try {
                //Upload to the database
                const db_status = await uploadCustomer(userData);
                if (db_status) {
                    res.send("done"); //Link it to login page!
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

//Partner
router.post('/register-partner',async (req,res) =>{
    try{
        partnerData ={
            "partner_id": rand.generateBase30(30),
            "partner_email": req.body.email,
            "partner_pass": await bcrypt.hash(req.body.pass, 10),
            "reg_date": getDate.toLocaleDateString(),
            "reg_time": getDate.getTime()
        }
        console.log(partnerData);
        }catch(error){
            console.error("Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        //Check if email already in db
        try{
            var custEmailExist = await partEmailCheck(partnerData);
            console.log(custEmailExist);
            if(custEmailExist){
                try {
                    //Upload to the database
                    const db_status = await uploadPartner(partnerData);
                    if (db_status) {
                        res.send("done"); //Link it to login page!
                    } else {
                        return res.status(500).json({ error: "An error occured!" });
                    }
                } catch (error) {
                    return res.status(500).json({ error: "Internal Server Error" });
                }
            }else{
                //Tell user email already exits
                res.render('pages/registeration-pages/partner/partner-reg.ejs',{
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