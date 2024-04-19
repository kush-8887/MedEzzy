const router = require("express").Router();
const { performSqlQuery } = require("../../database/dbconnection");

/* 
    products api routes to fetch shop items 
    1) Begin with shop/v1/
    2) Each route will have its own params and data return limits
*/

//To get all details of items  (limit must be mentioned and should not be >15000) NOT USED !!!!
router.get("/products/v1/med/all-med", async (req, res) => {
  var limit = req.query.limit;

  if (!limit || limit > 14500) {
    res.status(400).send("Limit not provided or out of bounds!");
  } else {
    try {
      const q = `SELECT * FROM \`testingdb\`.\`med_info\` LIMIT ${limit};`;
      const data = await performSqlQuery(q);
      res.status(200).send(data["rows"]);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
});

//To get all details of a specific medicine by med_id
router.get("/products/v1/med/single-med/:medid", async (req, res) => {
  // var med_id = req.query.med_id;
  var med_id = req.params.medid;

  if (!med_id) {
    res.status(400).send("Invalid med_id provided!");
  } else {
    try {
      const q = `SELECT * FROM \`testingdb\`.\`med_info\` WHERE med_id = "${med_id}";`;
      const data = await performSqlQuery(q);
      if (data.length != 0) {
        // console.log(data["rows"]);
        res.status(200).send(data["rows"]);
      } else {
        res.status(404).send("Med not found, check med_id");
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
});

//implement product searching
router.post("/product/v1/search/:page", async (req, res) => {
    const searchTerm = req.body.q; // Access search term from request body for POST requests
    
    // Pagination implementation
    let page = parseInt(req.params.page) || 1;
    let limit = 50;
  
    // Calculate offset based on page and limit
    let offset = (page - 1) * limit;

    if (!searchTerm) {
      console.error("Missing search term in request");
      return res.status(400).send("Please provide a search term"); // Use 400 for bad request
    }
  
    try {
        const sql = `SELECT med_id, med_name, med_image_url, med_price, med_dist
        FROM testingdb.med_info
        WHERE med_name LIKE "%${searchTerm}%"  LIMIT ${limit} OFFSET ${offset}`;
  
      const result = await performSqlQuery(sql); // Assuming performSqlQuery returns a single result
  
      if (!result) {
        console.log("No matching medications found");
        return res.status(404).send("No medications found for your search term"); // Use 404 for not found
      }
  
      res.status(200).send(result["rows"]);
    } catch (error) {
      console.error("Error performing search:", error);
      res.status(500).send("Internal server error. Please try again later."); // Generic error message
    }
});

  

module.exports = router;
