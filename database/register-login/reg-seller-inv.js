/*
    This function assigns an cart to the customer, stores data into cart_creds
    params - userData (an obj)
    return - true on successful upload 
             false on failure
*/

const {performSqlQuery } = require('../dbconnection.js');

function assignInv(userData){
    var query = `INSERT INTO testingdb.seller_inv (inv_id,inv_created_date,inv_created_time,inv_total) VALUES ("${userData.inv_id}","${userData.user_reg_date}","${userData.user_reg_time}",${0}) `
    try{
        performSqlQuery(query);
    }catch(e){
        console.log(e);
    }
}

module.exports ={
    assignInv
}