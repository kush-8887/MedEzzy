const bcrypt = require('bcrypt');
const { performSqlQuery } = require('../../database/dbconnection');

/* 
    Check part function takes role as an argument and calls the functions according to roles to check pass
    
    Each funtions query db and compare pass using bcrypt 

    return true for pass_match and false for no match
*/

async function checkPartPass(partData) {
    let role = partData["user_role"];
    if (role === "seller") {
        return await sellerPass(partData);
    } 
    if(role === "doctor"){
        return await doctorPass(partData);
    }
    if(role ==="delivery"){
        return await deliveryPass(partData);
    }
    else {
        throw new Error("Invalid role");
    }
}

async function sellerPass(partData) {
    const q = `SELECT seller_pass FROM \`testingdb\`.\`seller_creds\` WHERE seller_email="${partData["user_email"]}";`;
    const passToCheck = partData["user_pass"];

    try {
        const result = await performSqlQuery(q);
        if (result.rows.length === 0) {
            return false; 
        }
        // Assuming structure will be same => {rows=[{key:value}]}
        const encry_pass = result.rows[0]["seller_pass"]; // Must match db result
        const pass_match = await bcrypt.compare(passToCheck, encry_pass);
        return pass_match;
    } catch (error) {
        console.error("Error performing SQL query:", error);
        throw error; // rethrow the error to handle at a higher level
    }
}
async function doctorPass(partData) {
    const q = `SELECT doctor_pass FROM \`testingdb\`.\`doctor_creds\` WHERE doctor_email="${partData["user_email"]}";`;
    const passToCheck = partData["user_pass"];

    try {
        const result = await performSqlQuery(q);
        if (result.rows.length === 0) {
            return false; 
        }
        // Assuming structure will be same => {rows=[{key:value}]}
        const encry_pass = result.rows[0]["doctor_pass"]; // Must match db result
        const pass_match = await bcrypt.compare(passToCheck, encry_pass);
        return pass_match;
    } catch (error) {
        console.error("Error performing SQL query:", error);
        throw error; // rethrow the error to handle at a higher level
    }
}
async function deliveryPass(partData) {
    const q = `SELECT delivery_part_pass FROM \`testingdb\`.\`delivery_part_creds\` WHERE delivery_part_email="${partData["user_email"]}";`;
    const passToCheck = partData["user_pass"];

    try {
        const result = await performSqlQuery(q);
        if (result.rows.length === 0) {
            return false; 
        }
        // Assuming structure will be same => {rows=[{key:value}]}
        const encry_pass = result.rows[0]["delivery_part_pass"]; // Must match db result
        const pass_match = await bcrypt.compare(passToCheck, encry_pass);
        return pass_match;
    } catch (error) {
        console.error("Error performing SQL query:", error);
        throw error; // rethrow the error to handle at a higher level
    }
}

module.exports ={
    checkPartPass
}