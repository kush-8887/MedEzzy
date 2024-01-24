/* 
    Upload partner registeration data to server using dbconnection.js
    params - partnerData (an obj)
    return - true on successful upload 
             false on failure
    
    NOTE - all data entered in query using tempelate literals must be inside ""
*/

const {performSqlQuery } = require('../dbconnection.js');

async function uploadPartner(partnerData,role) {
    
}

module.exports ={
    uploadPartner
}