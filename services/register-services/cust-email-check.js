const { performSqlQuery } = require('../../database/dbconnection');

function custEmailCheck(userData) {
    const q = 'SELECT user_email FROM `testingdb`.`user_creds`;';
    const emailToCheck = userData.user_email;

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
function partEmailCheck(partnerData) {
    const q = 'SELECT partner_email FROM `testingdb`.`partner_creds`;';
    const emailToCheck = partnerData.partner_email;

    return performSqlQuery(q)
        .then(result => {
            const partner_email = result.rows;

            for (var i = 0; i < partner_email.length; i++) {
                if (partner_email[i].user_email === emailToCheck) {
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
    partEmailCheck
}