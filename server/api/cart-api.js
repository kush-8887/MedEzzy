const router = require('express').Router();
const {uploadCart,getCart,updateCart,updateGrandTotal,deleteItemCart ,updateDeleteGrand,addGrandTotal} = require('../../services/shop-services.js/cart-service');
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
router.post('/addtocart/:pid', async (req, res) => {
    try {
        let userData = jwtDecode(req.cookies["access-token"]);
        const cartId = userData.userInfo["user_cart_id"];
        const details = req.body;
        
        let data = {
            cartId: cartId,
            product: details
        };
        
        //It cartid or data not found
        if (!cartId || !details) {
            return res.status(400).send('Bad Request');
        } else {
            //Upload to cart
            let status = await uploadCart(data);
            if (status) {
                try {
                    //Update the grand total in cart_creds
                    await addGrandTotal(data); 
                } catch (error) {
                    return res.status(500).send("Internal server error! Unable to update Cart");
                }
                return res.sendStatus(200);
            } else if (status === "duplicate") {
                return res.status(400).send("Duplicate item in cart");
            } else {
                return res.status(500).send("Unable to add item.");
            }
        }
    } catch (error) {
        return res.status(500).send('Internal Server Error');
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
        res.sendStatus(200);
    }catch (error) {
        console.error(error);
        res.status(500).send("Unable to delete cart item!");
    }

    //Automatic reload expected (fix if time!)
    
});

module.exports = router;