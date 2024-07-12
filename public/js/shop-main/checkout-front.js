async function fetchItems(){
    let data = await fetch('http://localhost:8080/fetch-checkout');
    let items = await data.json();
    return items;
}

function displayItems(item){
    let main = document.getElementById('main');
    if(item === undefined || item === '' ){
        main.innerHTML += "No items! Add items in Cart first."
    }else{
        item.forEach(i => {
            main.innerHTML += `
            <div class="cart-item-card">
            <button class="delete-item">
                <img src="./cross-svgrepo-com.svg" alt="" srcset="">
            </button>
            <div class="item-info-cont">
                <div class="med-img">
                    <img src="${i.product_img}"
                        alt="">
                </div>
                <div class="med-name mobile-flex">
                    <div class="mobile-label">
                        Name:
                    </div>
                    ${i.product_name}
                </div>
            </div>
            <div class="cart-prices-cont">
                <div class="med-price mobile-flex">
                    <div class="mobile-label">
                        Price:
                    </div>
                    ₹${i.product_price}
                </div>
                <div class="item-quantity-cont mobile-flex">
                    <div class="mobile-label">
                        Quantity:
                    </div>
                    <div class="border">
                        <button class="quant-btn" id="increaseBtn">+</button>
                        <input type="text" type="number" value="${i.product_quantity}" min="1" class="item-quant" class="item-quant"
                            id="" readonly>
                        <button class="quant-btn" id="decreaseBtn">-</button>
                    </div>
                </div>
                <div class="item-sub-total mobile-flex">
                    <div class="mobile-label">
                        Subtotal:
                    </div>
                    ₹${i.product_subtotal}
                </div>
            </div>
        </div>
            `
        })
    }
}

async function fetchTotal(){
    let data = await fetch('http://localhost:8080/fetch-total');
    let items = await data.json();
    return items;
}

async function displayTotal(){
    let subCont = document.getElementById('cart-subtotal');
    let totalCont = document.getElementById('cart-total');
    let code = document.getElementById('code').value;


    let res = await fetchTotal();
    let subtotal = res.cart_total
    subCont.innerHTML += subtotal;


    if(code === ""){
        totalCont.innerHTML+= subtotal;
    }else if(code === "SAVE25"){
        let newTotal = Math.floor(subtotal - ((subtotal * 25) /100));
        totalCont.innerHTML += newTotal;
    }
}




let btn = document.getElementById('applyDist');
btn.addEventListener('click', async () => {
    let totalCont = document.getElementById('cart-total');
    let code = document.getElementById('code').value.toUpperCase();

    let distCont = document.getElementById('dist-cont');
    let dist = document.getElementById('disct-applied');

    let res = await fetchTotal();
    let subtotal = res.cart_total;

    if (code === "SAVE25") {
        let dst = Math.floor((subtotal * 25) / 100);
        let newTotal = Math.floor(subtotal - dst);
        totalCont.innerHTML = `₹${newTotal}`;

        distCont.style.display = "flex";
        dist.innerHTML += dst
    } else {
        window.alert("Invalid Code");
    }
});



document.addEventListener('DOMContentLoaded',async()=>{
    let item = await fetchItems();
    console.log(item);
    displayItems(item);
    displayTotal()
})