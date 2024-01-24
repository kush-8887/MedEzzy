//Partner services
const router = require('express').Router();
const bcrypt = require('bcrypt');
const {uploadPartner} = require('../../database/register-login/reg-partner');
const {partEmailCheck} = require('../../services/register-services/cust-email-check');

//Date class
const getDate = new Date;

//User data obj
let partnerData;

router.get('/register-seller',async(req,res)=>{
    res.render('pages/registeration-pages/partner/partner-reg.ejs',{
        roleType: "Seller",
        message: "",
        display: "none",
    });
})

router.get('/register-doctor',async(req,res)=>{
    res.render('pages/registeration-pages/partner/partner-reg.ejs',{
        roleType: "Doctor",
        message: "",
        display: "none",
    })
})

router.get('/register-delivery',async(req,res)=>{
    res.render('pages/registeration-pages/partner/partner-reg.ejs',{
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
            "user_email": req.body.email,
            "user_pass": await bcrypt.hash(req.body.pass,10),
            "user_reg_date" : getDate.toLocaleDateString(),
            "user_reg_time" : getDate.getTime(),
            "user_role" : role
        }
        console.log(partnerData);
    }catch(error){
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    //Check if email exist in db
    try{
        var emailExist = await partEmailCheck(partnerData);
        console.log(emailExist);

        if(emailExist){
            //Upload to do depending on the role
        }
    }catch(error){

    }
})

module.exports = router;