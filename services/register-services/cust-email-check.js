const { performSqlQuery } = require('../../database/dbconnection');

function custEmailCheck(userData) {
    const q = 'SELECT cust_email FROM `testingdb`.`cust_creds`;';
    const emailToCheck = userData.cust_email;

    return performSqlQuery(q)
        .then(result => {
            const user_email = result.rows;

            for (var i = 0; i < user_email.length; i++) {
                if (user_email[i].user_email === emailToCheck) {
                    return false;
                }
            }
            return true;
        })
        .catch(error => {
            console.error("Error performing SQL query:", error);
        });
}
module.exports ={
    custEmailCheck,
}