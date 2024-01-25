/* 
    Upload user registeration data to server using dbconnection.js
    params - userData (an obj)
    return - true on successful upload 
             false on failure
    
    NOTE - all data entered in query using tempelate literals must be inside ""

    Call a function to assign a cart to a user,inserting into cart_creds column
*/

const {performSqlQuery } = require('../dbconnection.js');
const {assignCart} = require('../../database/register-login/reg-customer-cart');

async function uploadCustomer(userData) {
    var query = `INSERT INTO testingdb.cust_creds (cust_id, cust_email, cust_pass, reg_date, reg_time, cust_role,cust_cart_id) VALUES ("${userData.cust_id}","${userData.cust_email}","${userData.cust_pass}","${userData.reg_date}","${userData.reg_time}","${userData.cust_role}","${userData.cust_cart_id}");`;
     try {
        performSqlQuery(query);
        assignCart(userData);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports ={
    uploadCustomer
}