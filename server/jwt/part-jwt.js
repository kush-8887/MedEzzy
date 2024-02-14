const { performSqlQuery } = require("../../database/dbconnection");
const { sign, verify } = require("jsonwebtoken");

//This function fetches important NONSENSITIVE data to send with jwt according to part role

async function fetchData(userData) {

  const role = userData["user_role"];
  console.log(role);

  if (role === "seller") {
    var q = `SELECT seller_email,seller_id,seller_inventory_id,user_role FROM \`testingdb\`.\`seller_creds\` WHERE seller_email="${userData["user_email"]}";`;

    return performSqlQuery(q)
      .then((result) => {
        const data = result.rows;
        return data[0];
      })
      .catch((error) => {
        console.error("Error performing SQL query:", error);
      });
  }
  if(role === "delivery"){
    var q = `SELECT delivery_part_email,delivery_part_id,user_role FROM \`testingdb\`.\`delivery_part_creds\` WHERE delivery_part_email="${userData["user_email"]}";`;

    return performSqlQuery(q)
      .then((result) => {
        const data = result.rows;
        return data[0];
      })
      .catch((error) => {
        console.error("Error performing SQL query:", error);
      });
  }
  if(role === "doctor"){
    var q = `SELECT doctor_email,doctor_id,user_role FROM \`testingdb\`.\`doctor_creds\` WHERE doctor_email="${userData["user_email"]}";`;

    return performSqlQuery(q)
      .then((result) => {
        const data = result.rows;
        return data[0];
      })
      .catch((error) => {
        console.error("Error performing SQL query:", error);
      });   
  }
  else{
    console.log("Error");
  }
}
//Creates and sign a jwt token!
async function createPartToken(user_data){
    try{
        let data = await fetchData(user_data);
        console.log(data);
        const accessToken = sign({"userInfo" : data },"secretKey");
        return accessToken;
    }catch{
        console.error('Error creating token:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}

module.exports = {
    createPartToken
}