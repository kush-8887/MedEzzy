const {performSqlQuery } = require('../dbconnection.js');

/* 
    Upon customer registeration initially profile will be empty with status incompelete
*/

async function uploadUserDetails(userData){
    let q = `INSERT INTO testingdb.cust_details (cust_id, email_id, profile_status) 
    VALUES ("${userData.cust_id}", "${userData.cust_email}", "no")`
    try{
        performSqlQuery(q);
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    uploadUserDetails
}