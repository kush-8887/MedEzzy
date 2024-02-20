const bcrypt = require('bcrypt');
const { performSqlQuery } = require('../../database/dbconnection');

// to test email - sonyps4kushka@gmail.com pass- Kush@2004

async function custPassCheck(userData) {
    const q = `SELECT cust_pass FROM \`testingdb\`.\`cust_creds\` WHERE cust_email="${userData["user_email"]}";`;
    const passToCheck = userData["user_pass"];

    return performSqlQuery(q)
        .then(async (result) => {
            //Assuming structure will be same => {rows=[{key:value}]}
            const encry_pass = result["rows"][0]["cust_pass"];
            const pass_match = await bcrypt.compare(passToCheck,encry_pass);
            if(pass_match){
                return pass_match;
            }else{
                return pass_match;
            }
        })
        .catch(error => {
            console.error("Error performing SQL query:", error);
        });
}

module.exports ={
    custPassCheck
};