//Partner services
const router = require('express').Router();
const bcrypt = require('bcrypt');
const rand = require('random-key');
const {uploadPartner} = require('../../database/register-login/reg-partner');
const {partEmailCheck} = require('../../services/register-services/part-email-check');

//Date class
const getDate = new Date;

//User data obj
let partnerData;

router.get('/register-seller',async(req,res)=>{
    res.render('pages/registeration-pages/partner/partner-reg.ejs',{
        role: "seller",
        roleType: "Seller",
        message: "",
        display: "none",
    });
})

router.get('/register-doctor',async(req,res)=>{
    res.render('pages/registeration-pages/partner/partner-reg.ejs',{
        role:"doctor",
        roleType: "Doctor",
        message: "",
        display: "none",
    })
})

router.get('/register-delivery',async(req,res)=>{
    res.render('pages/registeration-pages/partner/partner-reg.ejs',{
        role:"delivery",
        roleType: "Delivery Partner",
        message: "",
        display: "none",
    })
})

//post routes
router.post('/register-partner/:role',async(req,res)=>{
    const role = req["params"]["role"];
    try{
        partnerData = {
            "user_id":rand.generateBase30(30),
            "user_email": req.body.email,
            "user_pass": await bcrypt.hash(req.body.pass,10),
            "user_reg_date" : getDate.toLocaleDateString(),
            "user_reg_time" : getDate.getTime(),
            "user_role" : role
        }
    }catch(error){
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    //Check if email exist in db
    try{
        var emailExist = await partEmailCheck(partnerData);

        if(emailExist){
           const db_status = await uploadPartner(partnerData,role);
           if(db_status){
                res.send("done");
            } else {
                return res.status(500).json({ error: "An error occured!" });
            }
        }
        else{
            const roleTypes = {
                "seller" : "Seller",
                "doctor" : "Doctor",
                "delivery" :"Delivery Partner"
            }
            //CSS is not loading TO BE FIXED!
            res.render('pages/registeration-pages/partner/partner-reg.ejs',{
                role :role,
                roleType: roleTypes[role],
                message: "Email already in exists! Use different email or login!",
                display: "flex"
            });
        }
    }catch(error){
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;