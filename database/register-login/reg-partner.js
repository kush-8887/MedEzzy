/* 
    Upload partner registeration data to server using dbconnection.js
    params - partnerData (an obj)
    return - true on successful upload 
             false on failure
    
    NOTE - all data entered in query using tempelate literals must be inside ""
*/

const {performSqlQuery } = require('../dbconnection.js');

async function uploadPartner(partnerData) {
    var query = `INSERT INTO testingdb.partner_creds (partner_id, partner_email, partner_pass, reg_date, reg_time) VALUES ("${partnerData.partner_id}","${partnerData.partner_email}","${partnerData.partner_pass}","${partnerData.reg_date}","${partnerData.reg_time}");`;
     try {
        performSqlQuery(query);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports ={
    uploadPartner
}