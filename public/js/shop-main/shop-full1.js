//Elements
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const itemContainer = document.getElementById('itemContainer');

//Fetch link
let link = `http://localhost:8080/shop/v1/getitem/`;

//categories array
let filterArray = [];
let categoriesArray = [];

//page class
class Page {
    // Function to get the current page number (integer)
    getPage() {
        let pageNo = document.getElementById('page-no');
        return parseInt(pageNo.value);
    }
    
    // Function to set page
    setPage(pageNo) {
        let page = document.getElementById('page-no'); 
        page.value = pageNo;
    }
}

// Page class init
let p = new Page();

increase.addEventListener('click', async() => {
    let page = p.getPage();
    page += 1;
    p.setPage(page);

    let link = dummyFetcher('',page);
    const data = await fetchData(link,page);
    putData(data,itemContainer)
});

decrease.addEventListener('click',async ()=>{
    let page = p.getPage();
    if(page === 1){
        //pass
    }
    else{
        page -= 1;
        p.setPage(page);
        let link = dummyFetcher('',page);
        const data = await fetchData(link,page);
        putData(data,itemContainer)
    }
})

// Function to get categories selected
function getCategories() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            addToCat();
        });
    });
}

// Function to add selected categories to the categoriesArray
function addToCat() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            if (!categoriesArray.includes(checkbox.id)) {
                categoriesArray.push(checkbox.id);
            }
        } else {
            // Remove unchecked checkbox from categoriesArray
            categoriesArray = categoriesArray.filter(item => item !== checkbox.id);
        }
    });
    fetchWithCat();
};

//function to modify query and fetch data with categories
async function fetchWithCat(){
    let page = p.getPage();
    let data,link;
    if(categoriesArray.length === 0){
        console.log('cat array empty!');
        dummyFetcher('',page)
    }
    else{
        let q = ``
        categoriesArray.forEach(cat =>{
            q+= `&cat=${cat}`;
        })
        link = dummyFetcher(q,page);
        data = await fetchData(link,page);
        putData(data,itemContainer)
    }
}

//Function to get selected filters
function getFilters() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="a"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            addToFilt();
        });
    });
}

//function to add to filters array
function addToFilt() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="a"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            if (!filterArray.includes(checkbox.id)) {
                filterArray.push(checkbox.id);
            }
        } else {
            // Remove unchecked checkbox from categoriesArray
            filterArray = filterArray.filter(item => item !== checkbox.id);
        }
    });
    console.log(filterArray);
    fetchWithFilter();
};

//function to modify query and fetch with filters
async function fetchWithFilter(){
    let page = p.getPage();
    let link,data;
    if(filterArray.length === 0){
        dummyFetcher('',page)
    }
    else{
        let q = ``
        filterArray.forEach(fil =>{
            q+= `&fil=${fil}`;
        })
        link = dummyFetcher(q,page);
        data = await fetchData(link,page);
        putData(data,itemContainer)
    }
}

//Function to populate the page
function putData(data,parent){
    parent.innerHTML = '';
    data.forEach(data =>{
        let discountPercentage = data.med_dist !== null ? `${data.med_dist}` : 0;
        let price;
        if(discountPercentage === 0 ){
            price = data.med_price;
        }
        else{
            price = Math.floor(data.med_price - (data.med_price * data.med_dist)/100)
        }
        parent.innerHTML += `
        <div class="item-card">
        <div class="item-img">
            <div class="floating-menu">
                <button id="view-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <circle cx="12" cy="12" r="3.5" stroke="#fff"></circle>
                            <path d="M21 12C21 12 20 4 12 4C4 4 3 12 3 12" stroke="#fff"></path>
                        </g>
                    </svg>
                </button>
            </div>
            <div class="item-img-fix-div">
                <img src="${data.med_image_url}"
                    alt="">
            </div>
        </div>
        <div class="item-info">
            <div class="item-name">
                <a href="/shop/item/${data.med_id}" target="_blank" rel="noopener noreferrer">Asthalin 100mcg Inhaler</a>
            </div>
            <div class="item-price-cont">
                <div class="item-price-util">
                    <div class="original-price" style="color:grey; text-decoration:line-through;">MRP:₹${data.med_price}
                    </div>
                    <div class="discount-percentage" style="color:red;">${discountPercentage}% OFF</div>
                </div>
                <div class="discounted-price">
                    ₹${price}
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

//fetch data
// async function fetchData(link,page){
//     if(link === ''){
//         link = `http://localhost:8080/shop/v1/getitem/${page}`
//         let res = await fetch(link);
//         let d = await res.json();
//         return d;
//     }else{
//         let res = await fetch(link);
//         let d = await res.json();
//         return d;
//     }
// }


//Modify the link
function dummyFetcher(q, page) {
    console.log(q,page);
    if (link.endsWith(`/?d=default`)) {
        // Do nothing if the link already ends with the specified query string
    } else {
        link += `${page}/?d=default`; // Append the query string to the link
    }
    console.log(link); // Output the modified link to the console
}

document.addEventListener("DOMContentLoaded",async()=>{
    // Call the getCategories function to initialize event listeners
    getCategories();
    // Call the getFilters function to initialize event listeners
    getFilters();
    let page = p.getPage();
    let d = dummyFetcher('',page);
    // console.log(d);
    let data = await fetchData('',page);
    putData(data,itemContainer);
})