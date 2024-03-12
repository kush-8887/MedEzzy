//This fucntion gets all details of med through its id
async function getMedDetails(id){
    try{
        let data = await fetch(`http://localhost:8080/products/v1/med/single-med/${id}`);
        let med_info = await data.json();
        return med_info;
    }
    catch(error){
        return error;
    }
}

module.exports = {
    getMedDetails
}