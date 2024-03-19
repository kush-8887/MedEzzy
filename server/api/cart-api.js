const router = require('express').Router();
const {uploadCart,getCart,updateCart,updateGrandTotal,deleteItemCart ,updateDeleteGrand} = require('../../services/shop-services.js/cart-service');
const { jwtDecode } = require('jwt-decode');

//Get cart from the database with cartID
router.get('/getcart',async(req,res)=>{
    try{
        let userData = jwtDecode(req.cookies["access-token"]);
        const cartId = userData.userInfo["user_cart_id"];

        const data = await getCart(cartId);

        res.status(200).send(data);
    }catch(error){
        res.status(500).send("Internal server error")   
    }
});

//Upload cart to the database with cartid
router.post('/addtocart/:pid',async(req,res)=>{
    try {
        let userData = jwtDecode(req.cookies["access-token"]);
        const cartId = userData.userInfo["user_cart_id"];
        const details = req.body;
        
        if(cartId === '' || details === ''){
            res.status(500).send('Internal server error')
        }
        else{
            let data = {
                cartId : cartId,
                product : details
            }
            let status =  uploadCart(data);
            if(status){
                res.sendStatus(200);
            }
            else if(status === "duplicate"){
                res.send(500);
            }
            else{
                res.sendStatus(500);
            }
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//update cart
router.post('/updatecart',async(req,res)=>{
    let userData = jwtDecode(req.cookies["access-token"])
    const cartId = userData.userInfo["user_cart_id"]
    let cart = req.body;

    //Update cart details
    try{
        updateCart(cartId,cart);
    }catch(error){
        res.sendStatus(500).send("Internal server error! Unable to update Cart")
    }
    //Update cart grand total
    try{
        updateGrandTotal(cartId,cart);
    }catch(error){
        res.sendStatus(500).send("Internal server error! Unable to update Cart")
    }
    res.sendStatus(200);
});

//Delete cart item
router.delete('/deleteitem',async(req,res)=>{
    let userData = jwtDecode(req.cookies["access-token"]);
    const cartId = userData.userInfo["user_cart_id"]
    let cart = req.body;
    
    try{
        await deleteItemCart(cartId,cart);
        await updateDeleteGrand(cartId,cart);
    }catch (error) {
        console.error(error);
        res.status(500).send("Unable to delete cart item!");
    }

    //Automatic reload expected (fix if time!)
    res.redirect('/shop/cart1');
});

module.exports = router;