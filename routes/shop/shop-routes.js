const { verifyCustToken} = require('../../middleware/login/token-verification');
const { getMedDetails } = require('../../services/shop-services.js/get-items');
const { jwtDecode } = require('jwt-decode');

const router = require('express').Router();

//Test routes
router.get('/pag',async(req,res)=>{
    res.render('pag.ejs',{
        page : 1
    });
})

//Main shop route
router.get('/shop',verifyCustToken('customer'),(req, res) => {
    res.render('pages/shop-pages/main-shop.ejs');
});

//Indivisual item route
router.get('/shop/item/:id',verifyCustToken('customer'),async(req,res)=>{

    // console.log(req.cookies["access-token"]);

    const id = req.params.id;

    try{
        const med_info = await getMedDetails(id);
        res.render('pages/shop-pages/single-item.ejs',med_info[0]); //send the finished single item page (arush)
    }
    catch(error){
        //Send an error page!
        res.send(404);
    }
});

//shop cart route
router.get('/shop/cart1',verifyCustToken('customer'),(req,res)=>{
    let user_data = jwtDecode(req.cookies["access-token"])
    let cart_id = user_data.userInfo["user_cart_id"];

    if(cart_id === ''){
        res.send('Not authorized');
    }
    else{
        res.render('pages/shop-pages/cart.ejs')
    }
})

//Full shop route
router.get('/shop/shopfull',verifyCustToken('customer'),(req,res)=>{
    res.render(
        'pages/shop-pages/shop-full.ejs'
    )
})

router.get('/checkout',verifyCustToken('customer'),(req,res)=>{
    res.render(
        'pages/shop-pages/checkout.ejs'
    )
})

module.exports = router;