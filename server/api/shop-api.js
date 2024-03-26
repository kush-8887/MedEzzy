const router = require('express').Router();
const { performSqlQuery } = require('../../database/dbconnection'); 

/* 
    Shop api routes to fetch shop cards , best sellers etc
    1) Begin with shop/v1/
    2) Each route will have its own params and data return limits
*/

//Return best seller medicines
router.get('/shop/v1/bestsellers/:limit',async (req,res)=>{
    
    var limit = parseInt(req.params.limit);

    if(isNaN(limit)){
        res.status(400).send("Limit must be numeric.")
    }

    else if(!limit || limit > 14500){
        res.status(400).send("Limit not provided or out of bounds!");
    }

    else{
        try{
            const q = `SELECT med_id,med_name,med_image_url,med_price,med_dist FROM \`testingdb\`.\`med_info\` WHERE best_seller = "best" ORDER BY RAND() LIMIT ${limit}`;
            const data = await performSqlQuery(q);
            res.status(200).send(data["rows"]);
        }
        catch(error){
            res.status(500).send("Internal server error")
        }
    }

});

//Return deals of the day
router.get('/shop/v1/dealofday/:limit',async (req,res)=>{
    
    var limit = parseInt(req.params.limit);

    if(isNaN(limit)){
        res.status(400).send("Limit must be numeric.")
    }

    else if(!limit || limit > 14500){
        res.status(400).send("Limit not provided or out of bounds!");
    }

    else{
        try{
            const q = `SELECT med_id,med_name,med_image_url,med_price,med_dist FROM \`testingdb\`.\`med_info\` WHERE deal_day = "deal" ORDER BY RAND() LIMIT ${limit}`;
            const data = await performSqlQuery(q);
            res.status(200).send(data["rows"]);
        }
        catch(error){
            res.status(500).send("Internal server error")
        }
    }

});

//Returns all items in order (specified by a limit using pagination)
router.get('/shop/v1/getitem/:page', async (req, res) => {

    // Pagination implementation
    let page = req.params.page || 1;
    let limit = 50;
  
    // Calculate offset based on page and limit
    let offset = (page - 1) * limit;
    
    if(req.query.fil || req.query.cat){

        //Create a db connection with filters and categories!
        let filter = req.query.fil;
        let cat = req.query.fil;
    }
    else{
        try {
          let q = `SELECT med_id, med_name, med_image_url, med_price, med_dist FROM \`testingdb\`.\`med_info\` LIMIT ${limit} OFFSET ${offset}`;
      
          let data = await performSqlQuery(q);
          if (data && data.rows && data.rows.length > 0) {
            res.status(200).send(data.rows);
          } else {
            res.status(404).send({ message: "No items found" });
          }
        } catch (error) {
          res.status(500).send("Internal server error");
        }
    }
});

module.exports = router;