const router = require('express').Router();
const { jwtDecode } = require('jwt-decode');
const { performSqlQuery } = require('../../database/dbconnection');

router.get('/fetch-checkout',async(req,res)=>{
    let userData = jwtDecode(req.cookies["access-token"]);
    const cartId = userData.userInfo["user_cart_id"];

    const q = `SELECT * FROM testingdb.cart WHERE cart_id = "${cartId}"`;

    try{
        let data = await performSqlQuery(q);
        res.send(data.rows);
    }catch(error){
        console.log("Error fetching profile ",error);
    }
})

router.get('/fetch-total',async(req,res)=>{
    let userData = jwtDecode(req.cookies["access-token"]);
    const cartId = userData.userInfo["user_cart_id"];

    const q = `SELECT cart_total FROM testingdb.cart_creds WHERE cust_cart_id = "${cartId}"`;

    try{
        let data = await performSqlQuery(q);
        res.send(data.rows[0]);
    }catch(error){
        console.log("Error fetching profile ",error);
    }
})

module.exports = router;