const { performSqlQuery } = require("../../database/dbconnection");
const {sign,verify} = require('jsonwebtoken');

//This function fetches important NONSENSITIVE data to send with jwt
async function fetchData(userData) {
    const q = `SELECT cust_email,cust_id,cust_cart_id,cust_role FROM \`testingdb\`.\`cust_creds\` WHERE cust_email="${userData["user_email"]}";`

    return performSqlQuery(q).then(
        result =>{
            const data = result.rows;
            return data[0];
        }
    ).catch(error=>{
        console.error("Error performing SQL query:", error);
    })
}
// Create jwt token
async function createToken(userData) {
    try {
        const data = await fetchData(userData);
        const userInfo = {
            user_id: data.cust_id,
            user_email: data.cust_email,
            user_cart_id: data.cust_cart_id,
            user_role: data.cust_role
        };

        const accessToken = sign({ "userInfo": userInfo }, "secretKey");
        return accessToken;
    } catch (error) {
        console.error('Error creating token:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}

module.exports ={
    createToken,
}