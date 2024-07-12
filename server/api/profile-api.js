const router = require('express').Router();
const { jwtDecode } = require('jwt-decode');
const { performSqlQuery } = require('../../database/dbconnection');

router.get('/getusername',async(req,res)=>{
    let userData = jwtDecode(req.cookies["access-token"]);
    const userId = userData.userInfo["user_id"];

    let q = `SELECT email_id FROM testingdb.cust_details WHERE cust_id = "${userId}"`;
    try{
        let data = await performSqlQuery(q);
        res.send((data.rows[0]["email_id"]));
    }catch(error){
        console.log("Error fetching profile ",error);
    }
})

module.exports = router;