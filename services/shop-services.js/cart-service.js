const { performSqlQuery } = require('../../database/dbconnection');

//upload cart to the database
async function uploadCart(data){
    try {
        const q = `INSERT INTO testingdb.cart (
            cart_id, 
            product_id, 
            product_name, 
            product_img,
            product_quantity,
            product_price,
            product_subtotal
        ) 
        VALUES (
            "${data.cartId}", 
            "${data.product.productId}", 
            "${data.product.name}",
            "${data.product.img}", 
            ${data.product.quantity},
            ${data.product.amount},
            ${data.product.quantity * data.product.amount} -- Calculating subtotal here
        );
        `
        await performSqlQuery(q);
        return true;
    } catch (error) {
        // Check if the error code indicates a duplicate entry
        if (error.code === 'ER_DUP_ENTRY') {
            return "duplicate";
        } else {
            // Handle other errors
            throw error; // Re-throw the error for further handling if needed
        }
    }
}

//Update cart total when item is added to the cart total
async function addGrandTotal(data) {
    // Amount to be added
    let amnt = data.product.amount;
    let cartId = data.cartId;

    //Query
    const q = `SELECT cart_total FROM testingdb.cart_creds WHERE cust_cart_id = "${cartId}"`;

    try {
        //Get the current total
        let result = await performSqlQuery(q);
        let currentTotal = result.rows[0].cart_total;
        let newTotal = currentTotal + amnt;

        //Add new amount and update
        const updateQuery = `UPDATE testingdb.cart_creds SET cart_total = ${newTotal} WHERE cust_cart_id = "${cartId}"`;
        await performSqlQuery(updateQuery);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot update grand total (addToCart)");
    }
}

//Get items from cart;
async function getCart(cartID){
    const q = `SELECT * from testingdb.cart WHERE cart_id = "${cartID}"`
    const res = await performSqlQuery(q)
    return (res["rows"]);
}

// update functions
//Update cart items 
async function updateCart(userId,data){
    let q ;
    for(let d in data){
        if(d === 'grand'){
            //pass
        }
        else{
            q = `UPDATE testingdb.cart SET product_quantity = ${data[d]["quantity"]} ,product_subtotal = ${data[d]["subtotal"]}
                WHERE cart_id = "${userId}" AND product_id = "${d}"`
                try{
                    performSqlQuery(q);
                }catch(error){
                    throw new Error("Unable to update cart!")
                }
        }
    }
}

//Update the cart grand total in cart_creds 
//This function works only when cart it updated NOT when items is added to cart
async function updateGrandTotal(userId,data){
    let total = data["grand"];
    const q = `UPDATE testingdb.cart_creds SET cart_total = ${total} WHERE cust_cart_id = "${userId}"`
    try{
        performSqlQuery(q);
    }catch(error){
        throw new Error("Unable to update grand total! (cust_cart_creds)")
    }
}

// Delete functions
//Delete items from cart!
async function deleteItemCart(userId,data){
    let productId = data["productId"];
    
    const q = `DELETE FROM testingdb.cart WHERE cart_id = "${userId}" AND product_id="${productId}"`
    try{
        await performSqlQuery(q);
    }catch{
        throw new Error ("Unable to delete cart item!");
    }
}

//Update the grand_total after deletion
async function updateDeleteGrand(userId,data){
    let productSub = data["sub_total"];
    let grandTotal;

    //Query to first fetch grand total of user
    try{
        const q1 =`SELECT cart_total FROM testingdb.cart_creds WHERE cust_cart_id = "${userId}"`;
        let res = await performSqlQuery(q1);
        grandTotal = res["rows"][0]["cart_total"];
    }catch(error){
        throw new Error("Unable to fetch grand total");
    }
    //reduce the grand total
    grandTotal -= productSub

    //Check for negative values 
    if(grandTotal < 0 ){
        grandTotal = 0;
    }

    //Update grand total
    try{
        const q2 = `UPDATE testingdb.cart_creds SET cart_total = ${grandTotal} WHERE cust_cart_id = "${userId}"`;
        await performSqlQuery(q2)
    }catch(error){
        throw new Error("Unable to update grand total");
    }
}

module.exports = {
    uploadCart,
    getCart,
    updateCart,
    updateGrandTotal,
    deleteItemCart,
    updateDeleteGrand,
    addGrandTotal
}