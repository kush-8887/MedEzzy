const { performSqlQuery } = require('../../database/dbconnection');

//Function to check filters and categories and fetch data from db accoringly

async function fetchData(filter,cat,limit,offset){
    /* 
        Check data types of filter and cat (array or string)

        Check if filter or cat are undefined (i.e only cat or filter)

        Write WHERE query when datatype is array

        if datatype string Write simple WHERE QUERY

        implement limit and offset in each

        return data["rows"]
    */
    if(filter === undefined){
        return fetchCat(cat,limit,offset)
    }
    if(cat === undefined){ 
        return fetchFilter(filter,limit,offset);
    }
    else{
        return fetchCatAndFil(filter,cat,limit,offset)
    }
}

/*This function is called when only filters are given 
Checks data types of filter , if string only 1 filter is fetched , if array more than one filter is fetched
*/
async function fetchFilter(filter,limit,offset){
    if(typeof(filter) === "string"){
        let lower_fil = filter.toLowerCase();
        if(lower_fil === "best"){
            const q = `SELECT med_id, med_name, med_image_url, med_price, med_dist FROM \`testingdb\`.\`med_info\`WHERE best_seller = "${lower_fil}"  LIMIT ${limit} OFFSET ${offset}`
            const data = await performSqlQuery(q);
            return data["rows"];
        }
        else if(lower_fil === "deal"){
            const q = `SELECT med_id, med_name, med_image_url, med_price, med_dist FROM \`testingdb\`.\`med_info\`WHERE deal_day = "${lower_fil}"  LIMIT ${limit} OFFSET ${offset}`
            const data = await performSqlQuery(q);
            return data["rows"];
        }
    }else{
        const q = `SELECT med_id, med_name, med_image_url, med_price, med_dist FROM \`testingdb\`.\`med_info\`WHERE best_seller = "best" AND deal_day = "deal" LIMIT ${limit} OFFSET ${offset}`
        const data = await performSqlQuery(q);
        return data["rows"];
    }
}

/*This function is called when only categories are given 
Checks data types of categories , if string only 1 categories is fetched , if array more than one categories is fetched
*/
async function fetchCat(cat,limit,offset){
    if(typeof(cat)==="string"){
        let lower_cat = cat.toLowerCase();
        const q = `SELECT med_id, med_name, med_image_url, med_price, med_dist FROM \`testingdb\`.\`med_info\`WHERE med_types = "${lower_cat}"  LIMIT ${limit} OFFSET ${offset}`
        const data = await performSqlQuery(q);
        return data["rows"];
    }else{
        let q = "";
    cat.forEach((element, index) => {
    if (index !== 0) {
        q += " UNION ";
    }
    q += `SELECT med_id, med_name, med_image_url, med_price, med_dist FROM \`testingdb\`.\`med_info\` WHERE med_types IN ('${element}')`;
    });
    q += ` LIMIT ${limit} OFFSET ${offset}`;
        const data = await performSqlQuery(q);
        return data["rows"];
    }
}

/* 
fetches entries which contains both filter and categories
convert them into array , modify the query accordingly (some part modified by chatgpt)
*/
async function fetchCatAndFil(filter,cat,limit,offset){
    let filterArray = [];
    let catArray = [];

    // Convert filter and cat to arrays if they are strings
    if (typeof filter === "string") {
        filterArray.push(filter.toLowerCase());
    } else if (Array.isArray(filter)) {
        filterArray = filter.map(item => item.toLowerCase());
    }

    if (typeof cat === "string") {
        catArray.push(cat.toLowerCase());
    } else if (Array.isArray(cat)) {
        catArray = cat.map(item => item.toLowerCase());
    }

    // Construct the WHERE clause for filter
    let filterQuery = "";
    if (filterArray.length > 0) {
        filterQuery = ` AND (`;
        filterArray.forEach((item, index) => {
            filterQuery += `best_seller = "${item}" OR deal_day = "${item}"`;
            if (index !== filterArray.length - 1) {
                filterQuery += " OR ";
            }
        });
        filterQuery += `)`;
    }

    // Construct the WHERE clause for cat
    let catQuery = "";
    if (catArray.length > 0) {
        catQuery = ` AND med_types IN ('${catArray.join("','")}')`;
    }

    // Construct the final SQL query
    const q = `SELECT med_id, med_name, med_image_url, med_price, med_dist 
               FROM \`testingdb\`.\`med_info\`
               WHERE 1=1 ${filterQuery} ${catQuery}
               LIMIT ${limit} OFFSET ${offset}`;

    // Fetch data
    const data = await performSqlQuery(q);
    return data["rows"];
}
module.exports = {
    fetchData
}