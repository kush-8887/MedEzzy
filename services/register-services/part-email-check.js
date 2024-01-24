/*
    IT WORKS SOMEHOW LOL
    This function takes in a partnerData with role
    The table to be searched is selected according to the role of user

    if email is not found we return false
*/
const { performSqlQuery } = require('../../database/dbconnection');

async function partEmailCheck(partnerData) {
    const role = partnerData["role"];
    const emailToCheck = partnerData["user_email"];

    if (role === "seller") {
        return await checkSeller(emailToCheck);
    }
    else if(role === "doctor"){
        return await checkDoctor(emailToCheck);
    }
    else if(role === "delivery-part"){
        return await checkDelivery(emailToCheck);
    }
    else{
        return false;
    }
}

async function checkSeller(email) {
    var q = 'SELECT seller_email FROM `testingdb`.`seller_creds`;';
    try {
        const result = await performSqlQuery(q);
        const seller_email = result.rows;

        for (let i = 0; i < seller_email.length; i++) {
            if (seller_email[i].seller_email === email) {
                return false;
            }
        }
        return true;
    } catch (error) {
        console.log("Error performing SQL query:", error);
        return false;
    }
}
async function checkDoctor(email) {
    var q = 'SELECT doctor_email FROM `testingdb`.`doctor_creds`;';
    try {
        const result = await performSqlQuery(q);
        const doctor_email = result.rows;

        for (let i = 0; i < doctor_email.length; i++) {
            if (doctor_email[i].doctor_email === email) {
                return false;
            }
        }
        return true;
    } catch (error) {
        console.log("Error performing SQL query:", error);
        return false;
    }
}
async function checkDelivery(email) {
    var q = 'SELECT delivery_part_email FROM `testingdb`.`delivery_part_creds`;';
    try {
        const result = await performSqlQuery(q);
        const delivery_part_email = result.rows;

        for (let i = 0; i < delivery_part_email.length; i++) {
            if (delivery_part_email[i].delivery_email === email) {
                return false;
            }
        }
        return true;
    } catch (error) {
        console.log("Error performing SQL query:", error);
        return false;
    }
}

// Using an async function to wait for the result
async function runExample() {
    let a = await partEmailCheck({ "user_email": "jaiswalkush8@gmail.com", "role": "doctor" });
    console.log(a);
}

runExample();

//Export this function!