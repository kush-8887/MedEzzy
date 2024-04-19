/*
    This function assigns an cart to the customer, stores data into cart_creds
    params - userData (an obj)
    return - true on successful upload 
             false on failure
*/

const {performSqlQuery } = require('../dbconnection.js');

async function assignCart(userData){
    var query = `INSERT INTO testingdb.cart_creds (cust_cart_id,cart_created_date,cart_created_time,cart_total) VALUES ("${userData.cust_cart_id}","${userData.reg_date}","${userData.reg_time}",${0}) `
    try{
        performSqlQuery(query);
    }catch(e){
        console.log(e);
    }
}

module.exports ={
    assignCart
}