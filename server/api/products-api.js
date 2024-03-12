const router = require('express').Router();
const { performSqlQuery } = require('../../database/dbconnection'); 

/* 
    products api routes to fetch shop items 
    1) Begin with shop/v1/
    2) Each route will have its own params and data return limits
*/

//To get all details of items  (limit must be mentioned and should not be >15000)
router.get('/products/v1/med/all-med',async (req,res)=>{

    var limit = req.query.limit;

    if(!limit || limit > 14500){
        res.status(400).send("Limit not provided or out of bounds!");
    }
    else{
        try{
            const q = `SELECT * FROM \`testingdb\`.\`med_info\` LIMIT ${limit};`
            const data = await performSqlQuery(q);
            res.status(200).send(data["rows"]);
        }
        catch(error){
            res.status(500).send("Internal server error")
        }
    }
});

//To get all details of a specific medicine by med_id
router.get('/products/v1/med/single-med/:medid',async(req,res)=>{
    
    // var med_id = req.query.med_id;
    var med_id = req.params.medid;

    if(!med_id){
        res.status(400).send("Invalid med_id provided!");
    }
    else{
        try{
            const q = `SELECT * FROM \`testingdb\`.\`med_info\` WHERE med_id = "${med_id}";`
            const data = await performSqlQuery(q);
            if(data.length != 0){
                res.status(200).send(data["rows"]);
            }
            else{
                res.status(404).send("Med not found, check med_id")
            }
        }
        catch(error){
            res.status(500).send("Internal server error")
        }
    }
});

module.exports = router;