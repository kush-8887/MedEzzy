const { performSqlQuery } = require('../../database/dbconnection');

//Function to check filters and categories and fetch data from db accoringly

async function fetchData(filter,cat,up,limit,offset){
    /* 
        Check data types of filter and cat (array or string)

        Check if filter or cat are undefined (i.e only cat or filter)

        Write WHERE query when datatype is array

        if datatype string Write simple WHERE QUERY

        implement limit and offset in each

        return data["rows"]
    */
}