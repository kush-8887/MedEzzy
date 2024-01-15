/* 
    Upload user registeration data to server using dbconnection.js
    params - userData (an obj)
    return - true on successful upload 
             false on failure
    
    NOTE - all data entered in query using tempelate literals must be inside ""
*/

const {performSqlQuery } = require('../dbconnection.js');

async function uploadCustomer(userData) {
    var query = `INSERT INTO testingdb.user_creds (user_id, user_email, user_pass, reg_date, reg_time, user_role) VALUES ("${userData.user_id}","${userData.user_email}","${userData.user_pass}","${userData.reg_date}","${userData.reg_time}","${userData.user_role}");`;
     try {
        performSqlQuery(query);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports ={
    uploadCustomer
}