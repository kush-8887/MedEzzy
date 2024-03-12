
//Defined limits for fetching data
const BESTS_LIMIT = 5;
const DEALS_LIMIT = 2;

//fetch data
async function getBestSellers(){
    var data = await fetch(`http://localhost:8080/shop/v1/bestsellers/${BESTS_LIMIT}`)
    var bestSeller = await data.json();
    return bestSeller;
}
async function getDeals(){
    var data = await fetch(`http://localhost:8080/shop/v1/dealofday/${DEALS_LIMIT}`)
    var deals = await data.json();
    return deals;
}

//display best seller
function displayBestSeller(bestSeller){
    const bestSellerCont = document.getElementsByClassName('best-sellers-item-container')[0]; // Assuming there's only one element with this class, so we access the first one
    bestSeller.forEach(item => {
        bestSellerCont.innerHTML += `
        <div class="item-card">
            <div class="item-img">
                <div class="floating-menu">
                    <button id="view-item">
                        <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3.5" stroke="#fff"></circle> <path d="M21 12C21 12 20 4 12 4C4 4 3 12 3 12" stroke="#fff"></path> </g></svg>
                    </button>
                </div>
                <div class="item-img-fix-div">
                    <img src="${item["med_image_url"]}" alt="">
                </div>
            </div>
            <div class="item-info">
                <div class="item-name">
                    <a href="/shop/item/${item.med_id}" target="_blank" rel="noopener noreferrer">${item.med_name}</a>
                </div>
                <div class="item-price-cont">
                    <div class="item-price-util">
                        <div class="original-price" style="color:grey; text-decoration:line-through;">MRP:₹${item.med_price}</div>
                        <div class="discount-percentage" style="color:red;">${item.med_dist}% OFF</div>
                    </div>
                    <div class="discounted-price">
                    ₹${item.med_price - (Math.floor(item.med_price * item.med_dist / 100))}
                    </div>
                </div>
                <div class="item-action-btns">
                    <button class="action-btn" id="addToCart">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}

//display deals of day
function displayDealOfDay(deals){
    const dealCont = document.getElementsByClassName('deal-of-the-day-content')[0];
    deals.forEach(item =>{
        dealCont.innerHTML += `
        <div class="deal-item-card">
                <div class="item-img">
                    <!-- no floating-menu  -->
                    <!-- changed  -->
                    <div class="deal-item-img-fix-div">
                        <img src="${item.med_image_url}" alt="">
                    </div>
                </div>
                <!-- not to be changed -->
                <div class="item-info">
                    <div class="item-name">
                        <a href="/shop/item/${item.med_id}" target="_blank" rel="noopener noreferrer">${item.med_name}</a>
                    </div>
                    <div class="item-price-cont">
                        <div class="item-price-util">
                            <div class="original-price"style="color:grey; text-decoration:line-through;">MRP:₹${item.med_price}</div>
                            <div class="discount-percentage"style="color:red;">${item.med_dist}% OFF</div>
                        </div>
                        <div class="discounted-price">
                            ₹${item.med_price - (Math.floor(item.med_price * item.med_dist / 100))}
                        </div>
                    </div>
                    <div class="item-action-btns">
                        <button class="action-btn" id="addToCart">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `
    })
}

document.addEventListener('DOMContentLoaded',async()=>{
    let bestSeller = await getBestSellers();
    let deals = await getDeals();
    displayBestSeller(bestSeller);
    displayDealOfDay(deals);
})