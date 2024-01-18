//Partner services
const {uploadPartner} = require('../../database/register-login/reg-partner');
const {partEmailCheck} = require('../../services/register-services/cust-email-check');


router.get('/register-partner',async(req,res)=>{
    res.render('pages/registeration-pages/partner/partner-reg.ejs',{
        message: "",
        display: "none"
    });
})



//post routes
router.post('/register-partner',async (req,res) =>{x
    
});


router.post('/partner-role/:role',async(req,res)=>{
    const v = req.body;
    console.log(v);
})