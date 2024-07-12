/* 
    Upload partner registeration data to server using dbconnection.js
    params - partnerData (an obj) , role

    Role can from the following 3 values - "seller" ,"doctor" ,"delivery-part"

    return - true on successful upload 
             false on failure
    
    NOTE - all data entered in query using tempelate literals must be inside ""
*/

const {performSqlQuery } = require('../dbconnection.js');
const rand = require('random-key');
const {assignInv} = require('../register-login/reg-seller-inv.js');

async function uploadPartner(partnerData,role) {
    if(role === "seller"){
        return await uploadSeller(partnerData);
    }
    else if(role ==="doctor"){
        return await uploadDoctor(partnerData);
    }
    else if(role === "delivery"){
        return await uploadDelivery(partnerData);
    }
    else{
        return false;
    }
}

async function uploadSeller(partnerData){
    //Assign a inventory key 
    const inv_id = rand.generateBase30(30);
    partnerData["inv_id"] = inv_id;
    
    const query = `INSERT INTO testingdb.seller_creds (seller_id,seller_email,seller_pass,seller_reg_date,seller_reg_time,seller_inventory_id,user_role) VALUES ("${partnerData.user_id}","${partnerData.user_email}","${partnerData.user_pass}","${partnerData.user_reg_date}","${partnerData.user_reg_time}","${partnerData.inv_id}","${partnerData.user_role}")`;
    try{
        performSqlQuery(query);
        assignInv(partnerData);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}
//Add doctor and delivery partner reg

async function uploadDoctor(partnerData){
    const query = `INSERT INTO testingdb.doctor_creds (doctor_id,doctor_email,doctor_pass,doctor_reg_date,doc_reg_time,user_role) VALUES ("${partnerData.user_id}","${partnerData.user_email}","${partnerData.user_pass}","${partnerData.user_reg_date}","${partnerData.user_reg_time}","${partnerData.user_role}") `
    try{
        performSqlQuery(query);
        return true;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

async function uploadDelivery(partnerData){
    const query = `INSERT INTO testingdb.delivery_part_creds (delivery_part_id,delivery_part_email,delivery_part_pass,delivery_part_reg_date,delivery_part_reg_time,user_role) VALUES ("${partnerData.user_id}","${partnerData.user_email}","${partnerData.user_pass}","${partnerData.user_reg_date}","${partnerData.user_reg_time}","${partnerData.user_role}")`
    try{
        performSqlQuery(query);
        return true;
    }
    catch(error){
        console.log(error);
        return false;
    }
}
module.exports ={
    uploadPartner
}